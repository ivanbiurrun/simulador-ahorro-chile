import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import TopBar from '@/components/TopBar';
import Disclaimer from '@/components/Disclaimer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ahorra con Cabeza · Chile 🇨🇱',
  description:
    'Más que un simulador: una herramienta para aprender a hacer crecer tu plata. Define una meta, compara los productos de ahorro e inversión disponibles en Chile y entiende cómo funciona cada uno.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-crema text-tinta">
        <TopBar />
        <div className="flex-1">{children}</div>
        <Disclaimer />
        <Analytics />
      </body>
    </html>
  );
}
