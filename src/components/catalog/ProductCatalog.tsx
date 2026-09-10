'use client';

import { useMemo, useState } from 'react';
import { Check, ChevronDown, Download, Filter, Image as ImageIcon, Link as LinkIcon, Paperclip } from 'lucide-react';
import { categories, currentUser, products } from '@/src/lib/mockData';
import { formatCurrency } from '@/src/lib/utils';
import { useDashboardStore } from '@/src/lib/store';
import type { Product, ProductCategorySlug } from '@/src/types';

const filters: { label: string; value: ProductCategorySlug | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Planner', value: 'planner' },
  { label: 'Bisnis', value: 'bisnis' },
  { label: 'Bundle', value: 'bundle' },
];

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Bawaan', value: 'default' },
  { label: 'Termurah', value: 'price-asc' },
  { label: 'Termahal', value: 'price-desc' },
  { label: 'Nama A-Z', value: 'name-asc' },
];

function useAffiliateLink(product: Product) {
  const [copied, setCopied] = useState(false);
  const affiliateLink = `mayar.id/${product.id}-${product.title
    .toLowerCase()
    .split(' ')
    .slice(0, 3)
    .join('-')}?ref=${currentUser.referralCode}`;

  const handleGenerateLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return { copied, handleGenerateLink };
}

function ProductThumbnail({ product, className }: { product: Product; className?: string }) {
  if (product.previewImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.previewImage} alt={product.title} className={`h-full w-full object-cover ${className ?? ''}`} />;
  }
  return <ImageIcon className="text-white/80" size={36} strokeWidth={1.5} />;
}

function ProductCard({ product }: { product: Product }) {
  const { copied, handleGenerateLink } = useAffiliateLink(product);
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-lg">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${product.thumbnailUrl}`}>
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        <ProductThumbnail product={product} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink shadow-card backdrop-blur">
          {category?.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h4 className="line-clamp-2 text-sm font-semibold text-ink">{product.title}</h4>
        <p className="text-base font-extrabold text-orange-600">{formatCurrency(product.basePrice)}</p>

        <div className="mt-1 flex flex-col gap-2">
          <a
            href={product.fileAssetUrl}
            download
            className="flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-3 py-2.5 text-xs font-bold text-white shadow-card transition-all hover:bg-teal-700 active:scale-[0.98]"
          >
            <Download size={14} /> Download Aset
          </a>
          <div className="flex gap-2">
            {product.promotionalMaterialUrl ? (
              <a
                href={product.promotionalMaterialUrl}
                download
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-teal-900/10 px-3 py-2 text-xs font-semibold text-ink-light hover:bg-surface-alt"
              >
                <Paperclip size={13} /> Bonus
              </a>
            ) : (
              <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-xl border border-teal-900/5 px-3 py-2 text-xs font-semibold text-ink-light/40">
                <ImageIcon size={13} /> Mockup
              </span>
            )}
            <button
              onClick={handleGenerateLink}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600 hover:bg-orange-100"
            >
              {copied ? <Check size={13} /> : <LinkIcon size={13} />}
              {copied ? 'Tersalin' : 'Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product }: { product: Product }) {
  const { copied, handleGenerateLink } = useAffiliateLink(product);
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="flex gap-3 rounded-xl bg-surface p-3 transition-colors hover:bg-surface-alt">
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${product.thumbnailUrl}`}
      >
        <ProductThumbnail product={product} />
      </div>
      <div className="min-w-0 flex-1">
        <span className="w-fit rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold text-teal-700">
          {category?.name}
        </span>
        <h4 className="mt-1 truncate text-sm font-semibold text-ink">{product.title}</h4>
        <p className="text-sm font-bold text-orange-600">{formatCurrency(product.basePrice)}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <a
            href={product.fileAssetUrl}
            download
            className="flex items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-teal-700"
          >
            <Download size={12} /> Aset
          </a>
          {product.promotionalMaterialUrl && (
            <a
              href={product.promotionalMaterialUrl}
              download
              className="flex items-center gap-1 rounded-lg border border-teal-200 px-2.5 py-1.5 text-[11px] font-semibold text-teal-700 hover:bg-white"
            >
              <Paperclip size={12} /> Bonus
            </a>
          )}
          <button
            onClick={handleGenerateLink}
            className="flex items-center gap-1 rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1.5 text-[11px] font-semibold text-orange-600 hover:bg-orange-100"
          >
            {copied ? <Check size={12} /> : <LinkIcon size={12} />}
            {copied ? 'Tersalin' : 'Link Afiliasi'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<ProductCategorySlug | 'all'>('all');
  const [sort, setSort] = useState<SortOption>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const searchQuery = useDashboardStore((s) => s.searchQuery);

  const filteredProducts = useMemo(() => {
    let list =
      filter === 'all'
        ? products
        : products.filter((p) => {
            const category = categories.find((c) => c.id === p.categoryId);
            return category?.slug === filter;
          });

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'price-desc') list.sort((a, b) => b.basePrice - a.basePrice);
    if (sort === 'name-asc') list.sort((a, b) => a.title.localeCompare(b.title));

    return compact ? list.slice(0, 3) : list;
  }, [filter, compact, sort, searchQuery]);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-ink sm:text-lg">Katalog Produk Printable</h3>
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-teal-900/10 px-3 py-1.5 text-xs font-semibold text-ink-light hover:bg-surface-alt"
          >
            <Filter size={14} /> {sortOptions.find((o) => o.value === sort)?.label}
            <ChevronDown size={12} className={sortOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 z-10 mt-1.5 w-40 overflow-hidden rounded-xl border border-teal-900/5 bg-white p-1 shadow-card-lg">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSort(option.value);
                    setSortOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-semibold ${
                    sort === option.value ? 'bg-teal-50 text-teal-700' : 'text-ink-light hover:bg-surface-alt'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {searchQuery.trim() && (
        <p className="mb-3 text-xs font-medium text-ink-light">
          Hasil pencarian untuk <span className="font-bold text-ink">&ldquo;{searchQuery}&rdquo;</span> ({filteredProducts.length} produk)
        </p>
      )}

      <div className="mb-4 flex gap-1 overflow-x-auto rounded-xl bg-surface-alt p-1">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
              filter === value ? 'bg-teal-600 text-white shadow-card' : 'text-ink-light hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {compact ? (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
