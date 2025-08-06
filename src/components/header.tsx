import { Watch } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Watch className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">WatchSavvy AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#quiz" className="text-muted-foreground hover:text-foreground transition-colors">AI Quiz</a>
          <a href="#filter" className="text-muted-foreground hover:text-foreground transition-colors">Finder</a>
          <a href="#occasions" className="text-muted-foreground hover:text-foreground transition-colors">Occasions</a>
        </nav>
      </div>
    </header>
  );
}
