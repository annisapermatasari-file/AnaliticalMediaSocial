import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AsetDigital | Dashboard Reseller',
  description: 'Dashboard reseller untuk platform aset digital printable (Planner, Sticker, Wallpaper).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-surface">
        {children}
      </body>
    </html>
  );
}
