import { WatchMatchQuiz } from '@/components/watch-match-quiz';
import { AdvancedWatchFilter } from '@/components/advanced-watch-filter';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-headline">Find Your Perfect Timepiece</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Whether you're a seasoned collector or a first-time buyer, our AI-powered tools help you discover the watch that's right for you.
        </p>
      </section>

      <div className="space-y-24">
        <WatchMatchQuiz />
        <AdvancedWatchFilter />
      </div>
    </div>
  );
}
