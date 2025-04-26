import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Recommendation App',
  description: 'Discover your next favorite book',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col sm:flex-row min-h-screen">
        <Sidebar />
        <main className={`flex-1 bg-gray-100 min-h-screen pt-16 sm:pt-0 ${inter.className}`}>{children}</main>
      </body>
    </html>
  );
}