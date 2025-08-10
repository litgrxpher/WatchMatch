
import { AdvancedWatchFilter } from '@/components/advanced-watch-filter';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { InteractiveImage } from '@/components/interactive-image';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <section className="grid md:grid-cols-2 items-center gap-8 md:gap-12 mb-16 md:mb-24 animate-fade-in">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-headline [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
            Discover Your
            <br />
            <span className="text-primary">Perfect Timepiece</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            Whether you're a seasoned collector or a first-time buyer, our AI-powered tools help you discover the watch that's right for you.
          </p>
          <Link href="#watch-filter">
            <Button size="lg" className="font-headline">
              Start Your Search
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="relative h-80 md:h-96 w-full flex items-center justify-center [perspective:800px]">
          <InteractiveImage
            src="/casio-watch.png"
            alt="Casio F-91W watch"
            width={300}
            height={300}
          />
        </div>
      </section>

      <div id="watch-filter">
        <AdvancedWatchFilter />
      </div>
    </div>
  );
}
