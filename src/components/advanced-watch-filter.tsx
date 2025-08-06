"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';

type Watch = {
  id: number;
  name: string;
  brand: string;
  image: string;
  dataAiHint: string;
  movement: 'Automatic' | 'Quartz' | 'Manual';
  material: 'Stainless Steel' | 'Gold' | 'Titanium' | 'Ceramic';
  features: string[];
};

const mockWatches: Watch[] = [
  { id: 1, name: 'Submariner', brand: 'Rolex', image: 'https://placehold.co/400x400.png', dataAiHint: 'dive watch', movement: 'Automatic', material: 'Stainless Steel', features: ['Date', 'Water Resistance'] },
  { id: 2, name: 'Speedmaster Moonwatch', brand: 'Omega', image: 'https://placehold.co/400x400.png', dataAiHint: 'chronograph watch', movement: 'Manual', material: 'Stainless Steel', features: ['Chronograph', 'Tachymeter'] },
  { id: 3, name: 'Tank Must', brand: 'Cartier', image: 'https://placehold.co/400x400.png', dataAiHint: 'dress watch', movement: 'Quartz', material: 'Gold', features: ['Classic Design'] },
  { id: 4, name: 'Royal Oak', brand: 'Audemars Piguet', image: 'https://placehold.co/400x400.png', dataAiHint: 'luxury watch', movement: 'Automatic', material: 'Stainless Steel', features: ['Date', 'Integrated Bracelet'] },
  { id: 5, name: 'Pelagos', brand: 'Tudor', image: 'https://placehold.co/400x400.png', dataAiHint: 'tool watch', movement: 'Automatic', material: 'Titanium', features: ['Date', 'Water Resistance', 'Helium Escape Valve'] },
  { id: 6, name: 'Navitimer B01', brand: 'Breitling', image: 'https://placehold.co/400x400.png', dataAiHint: 'pilot watch', movement: 'Automatic', material: 'Stainless Steel', features: ['Chronograph', 'Slide Rule'] },
  { id: 7, name: 'BR 03-92', brand: 'Bell & Ross', image: 'https://placehold.co/400x400.png', dataAiHint: 'square watch', movement: 'Automatic', material: 'Ceramic', features: ['Date'] },
  { id: 8, name: 'Reverso Classic', brand: 'Jaeger-LeCoultre', image: 'https://placehold.co/400x400.png', dataAiHint: 'art deco', movement: 'Manual', material: 'Stainless Steel', features: ['Reversible Case'] },
];

const featureOptions = ['Chronograph', 'Date', 'Water Resistance', 'Tachymeter', 'GMT'];

export function AdvancedWatchFilter() {
  const [movement, setMovement] = useState('all');
  const [material, setMaterial] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredWatches = useMemo(() => {
    return mockWatches.filter(watch => {
      const movementMatch = movement === 'all' || watch.movement === movement;
      const materialMatch = material === 'all' || watch.material === material;
      const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every(f => watch.features.includes(f));
      return movementMatch && materialMatch && featureMatch;
    });
  }, [movement, material, selectedFeatures]);

  const resetFilters = () => {
    setMovement('all');
    setMaterial('all');
    setSelectedFeatures([]);
  }

  return (
    <section id="filter" className="scroll-mt-20">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Filter className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">FeatureFinder</CardTitle>
          <CardDescription className="text-md">Filter our collection to find the watch with your desired specs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 border-b pb-8">
            <div>
              <Label htmlFor="movement">Movement</Label>
              <Select value={movement} onValueChange={setMovement}>
                <SelectTrigger id="movement">
                  <SelectValue placeholder="Select movement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Movements</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Quartz">Quartz</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="material">Material</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger id="material">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Titanium">Titanium</SelectItem>
                  <SelectItem value="Ceramic">Ceramic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <Label>Features</Label>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                {featureOptions.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={() => handleFeatureChange(feature)}
                    />
                    <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-4 flex justify-end">
                <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredWatches.map(watch => (
              <Card key={watch.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={watch.image}
                      alt={`${watch.brand} ${watch.name}`}
                      width={400}
                      height={400}
                      data-ai-hint={watch.dataAiHint}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-muted-foreground">{watch.brand}</p>
                    <h3 className="text-lg font-semibold">{watch.name}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredWatches.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No watches match your criteria.</p>
              <p className="text-sm">Try adjusting your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}