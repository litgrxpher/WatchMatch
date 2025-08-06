
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Loader2, Sparkles, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { featureFinder } from '@/ai/flows/feature-finder';
import type { FeatureFinderOutput, FeatureFinderInput } from '@/ai/schemas/feature-finder-schemas';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import Link from 'next/link';

const featureOptions = ['Chronograph', 'GMT', 'Date', 'Moonphase', 'Perpetual Calendar', 'Tourbillon', 'Tachymeter', 'Power Reserve Indicator'];
const healthFeatureOptions = ['Heart Rate Monitor', 'SpO2 Sensor', 'Sleep Tracking', 'ECG', 'GPS'];

const OTHER_VALUE = '--other--';

export function AdvancedWatchFilter() {
  const [filters, setFilters] = useState<FeatureFinderInput>({
    movement: 'all',
    material: 'all',
    style: 'all',
    dialColor: 'all',
    strapType: 'all',
    waterResistance: 'any',
    glassType: 'all',
    features: [],
    priceRange: [0, 500000],
    caseSize: [36, 44],
  });
  
  const [otherValues, setOtherValues] = useState({
    movement: '',
    material: '',
    style: '',
    dialColor: '',
    strapType: '',
    waterResistance: '',
    glassType: '',
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
  
  const handleHealthFeatureChange = (feature: string) => {
    setFilters(prev => {
        const newFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
        return {...prev, features: newFeatures};
    });
  };

  const handleFilterChange = (key: keyof Omit<FeatureFinderInput, 'features' | 'priceRange' | 'caseSize'>, value: any) => {
      setFilters(prev => ({...prev, [key]: value}));
  }
  
  const handleOtherValueChange = (key: keyof typeof otherValues, value: string) => {
    setOtherValues(prev => ({...prev, [key]: value}));
  }

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);

    const finalFilters: FeatureFinderInput = { ...filters };
    (Object.keys(otherValues) as Array<keyof typeof otherValues>).forEach(key => {
        if (filters[key] === OTHER_VALUE) {
            finalFilters[key as keyof FeatureFinderInput] = otherValues[key];
        }
    });

    try {
      const searchResult = await featureFinder(finalFilters);
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
      dialColor: 'all',
      strapType: 'all',
      waterResistance: 'any',
      glassType: 'all',
      features: [],
      priceRange: [0, 500000],
      caseSize: [36, 44],
    });
    setOtherValues({
        movement: '',
        material: '',
        style: '',
        dialColor: '',
        strapType: '',
        waterResistance: '',
        glassType: '',
    });
    setResult(null);
  }

  return (
    <section>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Filter className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Feature Finder</CardTitle>
          <CardDescription className="text-md">Use our extensive filters to find the watch with your exact desired specs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border-b pb-8">
            {/* Filters */}
            <div className='space-y-2'>
              <Label htmlFor="movement">Movement</Label>
              <Select value={filters.movement} onValueChange={(v) => handleFilterChange('movement', v)}>
                <SelectTrigger id="movement"><SelectValue placeholder="Select movement" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Movement</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Quartz">Quartz</SelectItem>
                  <SelectItem value="Manual">Manual Wind</SelectItem>
                  <SelectItem value="Smart">Smart</SelectItem>
                  <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
              {filters.movement === OTHER_VALUE && (
                  <Input placeholder="Specify movement" value={otherValues.movement} onChange={(e) => handleOtherValueChange('movement', e.target.value)} />
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="material">Case Material</Label>
              <Select value={filters.material} onValueChange={(v) => handleFilterChange('material', v)}>
                <SelectTrigger id="material"><SelectValue placeholder="Select material" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Material</SelectItem>
                  <SelectItem value="Stainless Steel">Stainless Steel</SelectItem>
                  <SelectItem value="Titanium">Titanium</SelectItem>
                  <SelectItem value="Ceramic">Ceramic</SelectItem>
                  <SelectItem value="Carbon Fiber">Carbon Fiber</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
              {filters.material === OTHER_VALUE && (
                <Input placeholder="Specify material" value={otherValues.material} onChange={(e) => handleOtherValueChange('material', e.target.value)} />
              )}
            </div>
             <div className='space-y-2'>
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
                  <SelectItem value="Minimalist">Minimalist</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
               {filters.style === OTHER_VALUE && (
                <Input placeholder="Specify style" value={otherValues.style} onChange={(e) => handleOtherValueChange('style', e.target.value)} />
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="dialColor">Dial Color</Label>
              <Select value={filters.dialColor} onValueChange={(v) => handleFilterChange('dialColor', v)}>
                <SelectTrigger id="dialColor"><SelectValue placeholder="Select dial color" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Color</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Green">Green</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
                  <SelectItem value="Brown">Brown</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
               {filters.dialColor === OTHER_VALUE && (
                <Input placeholder="Specify dial color" value={otherValues.dialColor} onChange={(e) => handleOtherValueChange('dialColor', e.target.value)} />
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="strapType">Strap Type</Label>
              <Select value={filters.strapType} onValueChange={(v) => handleFilterChange('strapType', v)}>
                <SelectTrigger id="strapType"><SelectValue placeholder="Select strap type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Strap</SelectItem>
                  <SelectItem value="Leather">Leather</SelectItem>
                  <SelectItem value="Metal bracelet">Metal Bracelet</SelectItem>
                  <SelectItem value="Rubber">Rubber</SelectItem>
                  <SelectItem value="NATO/nylon">NATO/Nylon</SelectItem>
                  <SelectItem value="Ceramic">Ceramic</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
               {filters.strapType === OTHER_VALUE && (
                <Input placeholder="Specify strap type" value={otherValues.strapType} onChange={(e) => handleOtherValueChange('strapType', e.target.value)} />
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="waterResistance">Water Resistance</Label>
              <Select value={filters.waterResistance} onValueChange={(v) => handleFilterChange('waterResistance', v)}>
                <SelectTrigger id="waterResistance"><SelectValue placeholder="Select water resistance" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="30m">30m (Splash resistant)</SelectItem>
                  <SelectItem value="50m">50m (Light swimming)</SelectItem>
                  <SelectItem value="100m">100m (Swimming/Snorkeling)</SelectItem>
                  <SelectItem value="200m+">200m+ (Diving)</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
               {filters.waterResistance === OTHER_VALUE && (
                <Input placeholder="Specify water resistance" value={otherValues.waterResistance} onChange={(e) => handleOtherValueChange('waterResistance', e.target.value)} />
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor="glassType">Glass Type</Label>
              <Select value={filters.glassType} onValueChange={(v) => handleFilterChange('glassType', v)}>
                <SelectTrigger id="glassType"><SelectValue placeholder="Select glass type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Sapphire">Sapphire Crystal</SelectItem>
                  <SelectItem value="Mineral">Mineral Crystal</SelectItem>
                  <SelectItem value="Acrylic">Acrylic</SelectItem>
                   <SelectItem value={OTHER_VALUE}>Other...</SelectItem>
                </SelectContent>
              </Select>
               {filters.glassType === OTHER_VALUE && (
                <Input placeholder="Specify glass type" value={otherValues.glassType} onChange={(e) => handleOtherValueChange('glassType', e.target.value)} />
              )}
            </div>
            <div className="space-y-3">
              <Label>Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1] >= 500000 ? '500,000+' : filters.priceRange[1].toLocaleString()}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(v) => setFilters(prev => ({...prev, priceRange: v}))}
                min={0}
                max={500000}
                step={10000}
              />
            </div>
             <div className="space-y-3">
              <Label>Case Size: {filters.caseSize[0]}mm - {filters.caseSize[1]}mm</Label>
              <Slider
                value={filters.caseSize}
                onValueChange={(v) => setFilters(prev => ({...prev, caseSize: v}))}
                min={30}
                max={50}
                step={1}
              />
            </div>
            
            <div className="md:col-span-3">
              <Label>Complications (Mechanical/Quartz)</Label>
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

            <div className="md:col-span-3">
              <Label>Smartwatch Features</Label>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                {healthFeatureOptions.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => handleHealthFeatureChange(feature)}
                    />
                    <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="ghost" onClick={resetFilters} className="w-full sm:w-auto">Reset Filters</Button>
                <Button onClick={handleSearch} disabled={loading} size="lg" className="w-full sm:w-auto">
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
                    <Card key={watch.name} className="overflow-hidden group flex flex-col">
                        <CardContent className="p-4 flex flex-col flex-grow">
                            <p className="text-sm font-medium text-muted-foreground">{watch.brand}</p>
                            <h3 className="text-lg font-semibold">{watch.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 flex-grow">{watch.reason}</p>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={`https://www.google.com/search?q=${encodeURIComponent(watch.brand + ' ' + watch.name)}`} target="_blank" rel="noopener noreferrer">
                              <Search className="mr-2 h-4 w-4" />
                              Search on Google
                            </Link>
                          </Button>
                        </CardFooter>
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
