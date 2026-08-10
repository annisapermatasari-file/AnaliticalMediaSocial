import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard Media Sosial | Direktorat Kursus dan Pelatihan',
  description: 'Monitoring, Analisis, dan Evaluasi Komunikasi Digital',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-light-gray">
        {children}
      </body>
    </html>
  );
}
