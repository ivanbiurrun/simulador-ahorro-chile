import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Disclaimer from '@/components/Disclaimer';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simulador de Ahorro · Chile 🇨🇱',
  description:
    'Toma el control de tus metas y aprende a decidir mejor con tu plata. Herramienta educativa y de planificación financiera para el mercado chileno.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1">{children}</div>
        <Disclaimer />
        <Analytics />
      </body>
    </html>
  );
}
