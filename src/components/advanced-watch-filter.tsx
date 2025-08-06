
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Loader2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { featureFinder } from '@/ai/flows/feature-finder';
import type { FeatureFinderOutput, FeatureFinderInput } from '@/ai/schemas/feature-finder-schemas';
import { useToast } from '@/hooks/use-toast';

const featureOptions = ['Chronograph', 'Date', 'Water Resistance', 'Tachymeter', 'GMT', 'Moonphase', 'Perpetual Calendar'];

export function AdvancedWatchFilter() {
  const [filters, setFilters] = useState<FeatureFinderInput>({
    movement: 'all',
    material: 'all',
    style: 'all',
    features: [],
    priceRange: [0, 5000],
    caseSize: [36, 44],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureFinderOutput | null>(null);
  const { toast } = useToast();

  const handleFeatureChange = (feature: string) => {
    setFilters(prev => {
        const newFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
        return {...prev, features: newFeatures};
    });
  };

  const handleFilterChange = (key: keyof FeatureFinderInput, value: any) => {
      setFilters(prev => ({...prev, [key]: value}));
  }

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const searchResult = await featureFinder(filters);
      setResult(searchResult);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while getting watch suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
        movement: 'all',
        material: 'all',
        style: 'all',
        features: [],
        priceRange: [0, 5000],
        caseSize: [36, 44],
    });
    setResult(null);
  }

  return (
    <section id="filter" className="scroll-mt-20">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Filter className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">FeatureFinder AI</CardTitle>
          <CardDescription className="text-md">Use AI to filter our collection and find the watch with your desired specs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border-b pb-8">
            {/* Filters */}
            <div>
              <Label htmlFor="movement">Movement</Label>
              <Select value={filters.movement} onValueChange={(v) => handleFilterChange('movement', v)}>
                <SelectTrigger id="movement"><SelectValue placeholder="Select movement" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Movement</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Quartz">Quartz</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="material">Material</Label>
              <Select value={filters.material} onValueChange={(v) => handleFilterChange('material', v)}>
                <SelectTrigger id="material"><SelectValue placeholder="Select material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Material</SelectItem>
                  <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Titanium">Titanium</SelectItem>
                  <SelectItem value="Ceramic">Ceramic</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="style">Style</Label>
              <Select value={filters.style} onValueChange={(v) => handleFilterChange('style', v)}>
                <SelectTrigger id="style"><SelectValue placeholder="Select style" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Style</SelectItem>
                  <SelectItem value="Dive">Dive</SelectItem>
                  <SelectItem value="Dress">Dress</SelectItem>
                  <SelectItem value="Pilot">Pilot</SelectItem>
                  <SelectItem value="Field">Field</SelectItem>
                  <SelectItem value="Racing">Racing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1] >= 5000 ? '5000+' : filters.priceRange[1]}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(v) => handleFilterChange('priceRange', v)}
                min={0}
                max={5000}
                step={100}
              />
            </div>
             <div className="space-y-3">
              <Label>Case Size: {filters.caseSize[0]}mm - {filters.caseSize[1]}mm</Label>
              <Slider
                value={filters.caseSize}
                onValueChange={(v) => handleFilterChange('caseSize', v)}
                min={30}
                max={50}
                step={1}
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-3">
              <Label>Features</Label>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                {featureOptions.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => handleFeatureChange(feature)}
                    />
                    <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
           <div className="flex justify-center gap-4">
                <Button variant="ghost" onClick={resetFilters}>Reset Filters</Button>
                <Button onClick={handleSearch} disabled={loading} size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Watches...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Find Matches with AI
                    </>
                  )}
                </Button>
            </div>
          
          {result && (
             <div className="mt-12">
                <h2 className="text-2xl font-bold text-center mb-8">AI Watch Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {result.watches.map(watch => (
                    <Card key={watch.name} className="overflow-hidden group">
                        <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden bg-muted">
                            <Image
                            src={watch.imageUrl}
                            alt={`${watch.brand} ${watch.name}`}
                            width={400}
                            height={400}
                            data-ai-hint={`${watch.style} watch`}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-medium text-muted-foreground">{watch.brand}</p>
                            <h3 className="text-lg font-semibold">{watch.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{watch.reason}</p>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
             </div>
          )}

          {result && result.watches.length === 0 && (
            <div className="text-center py-12 text-muted-foreground mt-8">
              <p>No watches match your criteria.</p>
              <p className="text-sm">Try adjusting your filters and searching again.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
