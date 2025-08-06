"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Dumbbell, PartyPopper, Plane, Clock } from 'lucide-react';

type WatchSuggestion = {
  name: string;
  brand: string;
  image: string;
  dataAiHint: string;
  description: string;
};

const suggestions: Record<string, WatchSuggestion[]> = {
  formal: [
    { name: 'Calatrava', brand: 'Patek Philippe', image: 'https://placehold.co/400x600.png', dataAiHint: 'dress watch', description: 'The epitome of classic elegance, perfect for black-tie events.' },
    { name: 'Saxonia Thin', brand: 'A. Lange & Söhne', image: 'https://placehold.co/400x600.png', dataAiHint: 'minimalist watch', description: 'Understated and refined, its slim profile fits perfectly under a cuff.' },
  ],
  travel: [
    { name: 'GMT-Master II', brand: 'Rolex', image: 'https://placehold.co/400x600.png', dataAiHint: 'travel watch', description: 'Track multiple time zones with this iconic and robust travel companion.' },
    { name: 'World Time', brand: 'Patek Philippe', image: 'https://placehold.co/400x600.png', dataAiHint: 'luxury travel', description: 'For the discerning globetrotter, displaying 24 time zones at once.' },
  ],
  sports: [
    { name: 'G-Shock GA2100', brand: 'Casio', image: 'https://placehold.co/400x600.png', dataAiHint: 'sport watch', description: 'Virtually indestructible and packed with features for any athletic pursuit.' },
    { name: 'Seamaster Diver 300M', brand: 'Omega', image: 'https://placehold.co/400x600.png', dataAiHint: 'diving watch', description: 'A professional dive watch that looks just as good out of the water.' },
  ],
  daily: [
    { name: 'Datejust', brand: 'Rolex', image: 'https://placehold.co/400x600.png', dataAiHint: 'everyday watch', description: 'The perfect all-rounder, versatile enough for any daily scenario.' },
    { name: 'Khaki Field Mechanical', brand: 'Hamilton', image: 'https://placehold.co/400x600.png', dataAiHint: 'field watch', description: 'A rugged, reliable, and stylish field watch that won\'t break the bank.' },
  ]
};

export function EventWatchSuggestions() {
  return (
    <section id="occasions" className="scroll-mt-20">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <PartyPopper className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">OccasionWear</CardTitle>
          <CardDescription className="text-md">Get watch recommendations for any event or activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="formal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="formal" className="py-2"><Briefcase className="mr-2 h-4 w-4" /> Formal</TabsTrigger>
              <TabsTrigger value="travel" className="py-2"><Plane className="mr-2 h-4 w-4" /> Travel</TabsTrigger>
              <TabsTrigger value="sports" className="py-2"><Dumbbell className="mr-2 h-4 w-4" /> Sports</TabsTrigger>
              <TabsTrigger value="daily" className="py-2"><Clock className="mr-2 h-4 w-4" />Daily</TabsTrigger>
            </TabsList>
            
            {Object.entries(suggestions).map(([key, watches]) => (
              <TabsContent key={key} value={key}>
                <div className="grid md:grid-cols-2 gap-8">
                  {watches.map(watch => (
                    <div key={watch.name} className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <Image
                          src={watch.image}
                          alt={`${watch.brand} ${watch.name}`}
                          width={150}
                          height={225}
                          data-ai-hint={watch.dataAiHint}
                          className="rounded-lg object-cover w-[150px] h-[225px]"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-sm font-medium text-muted-foreground">{watch.brand}</p>
                        <h3 className="text-xl font-semibold mb-2">{watch.name}</h3>
                        <p className="text-muted-foreground">{watch.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}