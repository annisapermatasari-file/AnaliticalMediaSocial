import GoogleSignInButton from './GoogleSignInButton';

export default function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />

        <div className="relative">
          <h2 className="mx-auto max-w-xl text-2xl font-extrabold text-white sm:text-3xl">
            Siap mulai cuan dari aset digital?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-teal-50/90 sm:text-base">
            Daftar sekarang pakai Google, gratis untuk tier Bronze — tidak perlu kartu kredit.
          </p>
          <div className="mt-7 flex justify-center">
            <GoogleSignInButton label="Daftar Gratis dengan Google" />
          </div>
        </div>
      </div>
    </section>
  );
}
