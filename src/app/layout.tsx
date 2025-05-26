import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/lib/components/layout/header';
import { ToastContainer } from 'react-toastify';
import ToastListener from '@/lib/components/layout/toast-listener';
import Loader from '@/lib/components/layout/loader';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'User App',
  description: 'User app with nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <ToastContainer position="top-right" />
        <Suspense>
          <ToastListener />
          <Loader />
        </Suspense>
      </body>
    </html>
  );
}
