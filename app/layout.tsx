import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DARKCONE',
  description: 'Precision systems. LATAM-first. Cosmic-calm UX.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
