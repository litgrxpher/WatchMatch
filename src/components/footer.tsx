export function Footer() {
  return (
    <footer className="bg-card/80 border-t mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WatchSavvy AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
