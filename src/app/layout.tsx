import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { VantaBackground } from '@/components/vanta-background';

export const metadata: Metadata = {
  title: 'WatchBuddy',
  description: 'Find your perfect watch with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" strategy="beforeInteractive" />
      </head>
      <body className="font-body antialiased">
        <VantaBackground />
        <div className="flex flex-col min-h-screen relative z-10">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
