import Link from 'next/link';

const WatchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-primary"
  >
    <path d="M12 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9z" />
    <path d="M12 7v5l3 3" />
    <path d="M4 12H2" />
    <path d="M20 12h2" />
  </svg>
);


export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <WatchIcon />
          <span className="text-xl font-bold text-foreground">WatchSavvy AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#quiz" className="text-muted-foreground hover:text-foreground transition-colors">AI Quiz</a>
          <a href="#filter" className="text-muted-foreground hover:text-foreground transition-colors">Finder</a>
        </nav>
      </div>
    </header>
  );
}
