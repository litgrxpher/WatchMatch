import { Instagram, Twitter, Facebook, Database } from "lucide-react";
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card/80 border-t mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent"
            >
              <circle cx="10" cy="8" r="4" fill="currentColor" />
              <circle cx="14" cy="8" r="4" fill="currentColor" fillOpacity="0.7" />
              <circle cx="12" cy="14" r="4" fill="currentColor" fillOpacity="0.9" />
            </svg>
          <p>&copy; 2025 Litgrxpher. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="p-2 rounded-full hover:bg-accent/20 transition-colors">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full hover:bg-accent/20 transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full hover:bg-accent/20 transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
