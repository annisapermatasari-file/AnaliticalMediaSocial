import type { Metadata } from 'next';
import './globals.css';
import AuthSessionProvider from '@/src/components/providers/AuthSessionProvider';

export const metadata: Metadata = {
  title: 'AsetDigital | Platform Reseller Aset Digital',
  description: 'Jadi reseller printable digital (Planner, Sticker, Wallpaper) dan dapatkan komisi hingga 50%.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-surface">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
