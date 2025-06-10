import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Header';
import { UserProvider } from '@/context/UserContext';

const montserrat = localFont({
  src: '../public/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'DevFusion - Пошук роботи',
  description: 'DevFusion — сервіс пошуку роботи',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={montserrat.variable}>
      <body>
        <UserProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
