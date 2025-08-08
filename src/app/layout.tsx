import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import StarryBackground from '@/components/starry-background';

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
      </head>
      <body className="font-body antialiased">
        <StarryBackground />
        <div className="flex flex-col min-h-screen relative z-10 bg-transparent">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
