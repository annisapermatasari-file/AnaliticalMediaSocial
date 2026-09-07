-- =====================================================================
-- AsetDigital — Platform Reseller Aset Digital
-- Skema Database PostgreSQL / Supabase
-- =====================================================================

-- Diperlukan untuk gen_random_uuid() (Supabase sudah mengaktifkan ini
-- secara default lewat ekstensi pgcrypto).
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------
-- 1. TIERS
-- Menyimpan aturan tingkatan reseller: harga, komisi, poin rekrutmen,
-- dan syarat poin untuk naik ke tier tersebut.
-- ---------------------------------------------------------------------
CREATE TABLE tiers (
    id                       SERIAL PRIMARY KEY,
    name                     VARCHAR(20) NOT NULL UNIQUE,
    price                    NUMERIC(12, 2) NOT NULL,
    commission_rate          NUMERIC(4, 3) NOT NULL CHECK (commission_rate BETWEEN 0 AND 1),
    recruitment_points       INTEGER NOT NULL DEFAULT 0,
    upgrade_points_required  INTEGER NOT NULL DEFAULT 0,
    has_source_file_access   BOOLEAN NOT NULL DEFAULT FALSE,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE tiers IS 'Tingkatan reseller: Bronze, Silver, Gold beserta aturan komisi & poin.';

-- ---------------------------------------------------------------------
-- 2. USERS
-- Akun reseller. referred_by adalah self-reference ke user yang
-- merekrutnya (untuk pelacakan jaringan referral).
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id                    SERIAL PRIMARY KEY,
    name                  VARCHAR(150) NOT NULL,
    email                 VARCHAR(150) NOT NULL UNIQUE,
    password_hash         TEXT NOT NULL,
    tier_id               INTEGER NOT NULL REFERENCES tiers(id),
    referred_by           INTEGER REFERENCES users(id) ON DELETE SET NULL,
    referral_code         VARCHAR(50) NOT NULL UNIQUE,
    commission_balance    NUMERIC(14, 2) NOT NULL DEFAULT 0,
    accumulated_points    INTEGER NOT NULL DEFAULT 0,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_referred_by ON users(referred_by);
CREATE INDEX idx_users_referral_code ON users(referral_code);

COMMENT ON TABLE users IS 'Akun reseller aset digital.';
COMMENT ON COLUMN users.referred_by IS 'user.id dari reseller yang merekrut akun ini.';

-- ---------------------------------------------------------------------
-- 3. CATEGORIES & PRODUCTS
-- ---------------------------------------------------------------------
CREATE TABLE categories (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    slug  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id                        SERIAL PRIMARY KEY,
    category_id               INTEGER NOT NULL REFERENCES categories(id),
    title                     VARCHAR(200) NOT NULL,
    base_price                NUMERIC(12, 2) NOT NULL,
    file_asset_url            TEXT NOT NULL,
    source_file_url           TEXT,
    promotional_material_url  TEXT,
    tier_required_for_source  INTEGER REFERENCES tiers(id),
    is_active                 BOOLEAN NOT NULL DEFAULT TRUE,
    created_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category_id ON products(category_id);

COMMENT ON COLUMN products.file_asset_url IS 'File siap cetak (semua tier).';
COMMENT ON COLUMN products.source_file_url IS 'File mentahan/Canva/PSD (hanya tier tertentu, mis. Gold).';
COMMENT ON COLUMN products.promotional_material_url IS 'Mockup/bahan promosi untuk dipakai reseller berjualan.';

-- ---------------------------------------------------------------------
-- 4. TRANSACTIONS
-- Mencatat penjualan produk maupun event rekrutmen reseller baru.
-- ---------------------------------------------------------------------
CREATE TYPE transaction_type AS ENUM ('sale', 'recruitment');
CREATE TYPE payment_status AS ENUM ('paid', 'pending', 'failed');

CREATE TABLE transactions (
    id                  SERIAL PRIMARY KEY,
    transaction_code    VARCHAR(50) NOT NULL UNIQUE,
    user_id             INTEGER NOT NULL REFERENCES users(id),
    product_id          INTEGER REFERENCES products(id),
    type                transaction_type NOT NULL,
    amount              NUMERIC(12, 2) NOT NULL DEFAULT 0,
    commission_earned   NUMERIC(12, 2) NOT NULL DEFAULT 0,
    payment_status      payment_status NOT NULL DEFAULT 'pending',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_product_id ON transactions(product_id);

-- ---------------------------------------------------------------------
-- 5. POINT_LOGS
-- Riwayat poin masuk (rekrutmen, penjualan, bonus, dsb).
-- ---------------------------------------------------------------------
CREATE TYPE point_log_type AS ENUM ('recruitment', 'sale', 'bonus', 'adjustment');

CREATE TABLE point_logs (
    id           SERIAL PRIMARY KEY,
    user_id      INTEGER NOT NULL REFERENCES users(id),
    points       INTEGER NOT NULL,
    type         point_log_type NOT NULL,
    description  TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_point_logs_user_id ON point_logs(user_id);

-- ---------------------------------------------------------------------
-- 6. PAYOUTS
-- Pengajuan pencairan komisi reseller.
-- ---------------------------------------------------------------------
CREATE TYPE payout_status AS ENUM ('requested', 'processing', 'completed', 'rejected');

CREATE TABLE payouts (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES users(id),
    amount          NUMERIC(12, 2) NOT NULL,
    bank_name       VARCHAR(100) NOT NULL,
    account_number  VARCHAR(50) NOT NULL,
    status          payout_status NOT NULL DEFAULT 'requested',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payouts_user_id ON payouts(user_id);

-- ---------------------------------------------------------------------
-- 7. ONBOARDING_PROGRESS
-- Status checklist onboarding tiap reseller (satu baris per user).
-- ---------------------------------------------------------------------
CREATE TABLE onboarding_progress (
    id                    SERIAL PRIMARY KEY,
    user_id               INTEGER NOT NULL UNIQUE REFERENCES users(id),
    profile_completed     BOOLEAN NOT NULL DEFAULT FALSE,
    video_watched         BOOLEAN NOT NULL DEFAULT FALSE,
    material_downloaded   BOOLEAN NOT NULL DEFAULT FALSE,
    mayar_link_created    BOOLEAN NOT NULL DEFAULT FALSE,
    first_share_done      BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- TRIGGER: auto-update `updated_at`
-- =====================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_payouts_updated_at
    BEFORE UPDATE ON payouts
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_onboarding_updated_at
    BEFORE UPDATE ON onboarding_progress
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =====================================================================
-- TRIGGER: rekrutmen otomatis menambah poin ke akun pengajak
-- Saat transaksi bertipe 'recruitment' dibuat untuk seorang user,
-- tambahkan recruitment_points dari tier user tersebut ke
-- accumulated_points milik referred_by, dan catat di point_logs.
-- =====================================================================
CREATE OR REPLACE FUNCTION award_recruitment_points()
RETURNS TRIGGER AS $$
DECLARE
    v_referrer_id INTEGER;
    v_points      INTEGER;
BEGIN
    IF NEW.type <> 'recruitment' THEN
        RETURN NEW;
    END IF;

    SELECT u.referred_by, t.recruitment_points
    INTO v_referrer_id, v_points
    FROM users u
    JOIN tiers t ON t.id = u.tier_id
    WHERE u.id = NEW.user_id;

    IF v_referrer_id IS NOT NULL THEN
        UPDATE users
        SET accumulated_points = accumulated_points + v_points
        WHERE id = v_referrer_id;

        INSERT INTO point_logs (user_id, points, type, description)
        VALUES (
            v_referrer_id,
            v_points,
            'recruitment',
            'Rekrutmen reseller baru (user_id=' || NEW.user_id || ')'
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_award_recruitment_points
    AFTER INSERT ON transactions
    FOR EACH ROW EXECUTE FUNCTION award_recruitment_points();

-- =====================================================================
-- TRIGGER: upgrade tier otomatis berdasarkan akumulasi poin
-- Setelah accumulated_points bertambah, cek apakah user memenuhi
-- syarat upgrade_points_required tier berikutnya dan naikkan tier_id
-- jika terpenuhi (tanpa pembayaran tunai).
-- =====================================================================
CREATE OR REPLACE FUNCTION auto_upgrade_tier()
RETURNS TRIGGER AS $$
DECLARE
    v_next_tier_id INTEGER;
BEGIN
    SELECT id INTO v_next_tier_id
    FROM tiers
    WHERE upgrade_points_required > 0
      AND upgrade_points_required <= NEW.accumulated_points
      AND id > NEW.tier_id
    ORDER BY upgrade_points_required DESC
    LIMIT 1;

    IF v_next_tier_id IS NOT NULL THEN
        NEW.tier_id := v_next_tier_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_upgrade_tier
    BEFORE UPDATE OF accumulated_points ON users
    FOR EACH ROW EXECUTE FUNCTION auto_upgrade_tier();

-- =====================================================================
-- SEED DATA
-- =====================================================================
INSERT INTO tiers (name, price, commission_rate, recruitment_points, upgrade_points_required, has_source_file_access) VALUES
    ('Bronze', 99000,  0.20, 50,  0,    FALSE),
    ('Silver', 249000, 0.35, 100, 500,  FALSE),
    ('Gold',   499000, 0.50, 200, 1500, TRUE);

INSERT INTO categories (name, slug) VALUES
    ('Planner',   'planner'),
    ('Sticker',   'sticker'),
    ('Wallpaper', 'wallpaper');

INSERT INTO users (name, email, password_hash, tier_id, referred_by, referral_code, commission_balance, accumulated_points) VALUES
    ('Rizky Ramadhan', 'rizky.ramadhan@example.com', crypt('password123', gen_salt('bf')), 1, NULL, 'rizkyr',  500000, 750),
    ('Rizky Marhow',   'rizky.marhow@example.com',   crypt('password123', gen_salt('bf')), 1, 1,    'marhow',  0,      0),
    ('Salsa Amelia',   'salsa.amelia@example.com',   crypt('password123', gen_salt('bf')), 1, 1,    'salsaa',  0,      0),
    ('Dimas Prasetyo', 'dimas.prasetyo@example.com', crypt('password123', gen_salt('bf')), 2, 1,    'dimasp',  0,      0);

INSERT INTO products (category_id, title, base_price, file_asset_url, source_file_url, promotional_material_url, tier_required_for_source) VALUES
    (1, 'Minimalist 2026 Monthly Planner',   35000, '/assets/products/minimalist-2026-planner.pdf',       '/assets/sources/minimalist-2026-planner.psd',       '/assets/promo/minimalist-2026-planner-mockup.zip',       3),
    (2, 'Cute Animal Printable Stickers',    15000, '/assets/products/cute-animal-stickers.pdf',          '/assets/sources/cute-animal-stickers.psd',          '/assets/promo/cute-animal-stickers-mockup.zip',          3),
    (3, 'Abstract Waves Mobile Wallpaper',   12000, '/assets/products/abstract-waves-wallpaper.zip',      '/assets/sources/abstract-waves-wallpaper.psd',      '/assets/promo/abstract-waves-wallpaper-mockup.zip',      3),
    (1, 'Aesthetic Weekly Study Planner',    29000, '/assets/products/aesthetic-weekly-study-planner.pdf','/assets/sources/aesthetic-weekly-study-planner.psd','/assets/promo/aesthetic-weekly-study-planner-mockup.zip',3),
    (2, 'Motivational Quotes Sticker Pack',  18000, '/assets/products/motivational-quotes-stickers.pdf',  '/assets/sources/motivational-quotes-stickers.psd',  '/assets/promo/motivational-quotes-stickers-mockup.zip',  3),
    (3, 'Minimal Boho Desktop Wallpaper',    14000, '/assets/products/minimal-boho-wallpaper.zip',        '/assets/sources/minimal-boho-wallpaper.psd',        '/assets/promo/minimal-boho-wallpaper-mockup.zip',        3);

INSERT INTO transactions (transaction_code, user_id, product_id, type, amount, commission_earned, payment_status) VALUES
    ('TRX-20260901-001', 1, 1,    'sale',        35000, 7000, 'paid'),
    ('TRX-20260902-002', 1, 4,    'sale',        29000, 5800, 'paid'),
    ('TRX-20260903-003', 1, 2,    'sale',        15000, 3000, 'paid'),
    ('TRX-20260905-004', 1, NULL, 'recruitment', 0,     0,    'paid'),
    ('TRX-20260906-005', 1, 6,    'sale',        14000, 2800, 'pending');

INSERT INTO point_logs (user_id, points, type, description) VALUES
    (1, 500, 'recruitment', 'Rekrut reseller baru: Rizky Marhow'),
    (1, 150, 'sale',        'Bonus poin dari 3 transaksi penjualan'),
    (1, 50,  'recruitment', 'Rekrut reseller baru: Salsa Amelia'),
    (1, 50,  'bonus',       'Bonus onboarding checklist selesai');

INSERT INTO payouts (user_id, amount, bank_name, account_number, status) VALUES
    (1, 250000, 'BCA', '1234567890', 'completed'),
    (1, 500000, 'BCA', '1234567890', 'processing');

INSERT INTO onboarding_progress (user_id, profile_completed, video_watched, material_downloaded, mayar_link_created, first_share_done) VALUES
    (1, TRUE, TRUE, TRUE, FALSE, FALSE);
