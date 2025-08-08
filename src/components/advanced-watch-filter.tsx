
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Filter, Loader2, Sparkles, Search, Check, ChevronsUpDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { featureFinder } from '@/ai/flows/feature-finder';
import type { FeatureFinderOutput, FeatureFinderInput } from '@/ai/schemas/feature-finder-schemas';
import { useToast } from '@/hooks/use-toast';
import { Input } from './ui/input';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const movementOptions = ['Automatic', 'Quartz', 'Manual', 'Smart'];
const materialOptions = ['Stainless Steel', 'Titanium', 'Gold', 'Ceramic', 'Bronze', 'Carbon fiber', 'Platinum'];
const styleOptions = ['Dive', 'Dress', 'Pilot', 'Field', 'Racing', 'Minimalist'];
const dialColorOptions = ['Black', 'Blue', 'White', 'Green', 'Silver', 'Red', 'Brown'];
const strapTypeOptions = ['Leather', 'Metal bracelet', 'Rubber', 'NATO/nylon', 'Ceramic'];
const waterResistanceOptions = ['Up to 50m', '100m', '200m+'];
const glassTypeOptions = ['Sapphire', 'Mineral', 'Acrylic'];

const complicationOptions = [
  'Chronograph', 'GMT', 'Date', 'Day-Date', 'Moonphase', 'Perpetual Calendar', 'Tourbillon', 'Tachymeter', 
  'Power Reserve Indicator', 'Alarm', 'Minute Repeater', 'Annual Calendar', 'Equation of Time', 'Flyback Chronograph'
];
const smartFeatureOptions = [
  'Heart Rate Monitor', 'SpO2 Sensor', 'Sleep Tracking', 'ECG', 'GPS', 'NFC Payments', 'Music Storage',
  'Cellular Connectivity', 'Blood Pressure Monitor', 'Temperature Sensor', 'Fall Detection'
];

const OTHER_VALUE = '--other--';

type FilterKeys = Omit<FeatureFinderInput, 'priceRange' | 'caseSize'>;

export function AdvancedWatchFilter() {
  const [filters, setFilters] = useState<FeatureFinderInput>({
    movement: [],
    material: [],
    style: [],
    dialColor: [],
    strapType: [],
    waterResistance: [],
    glassType: [],
    features: [],
    priceRange: [0, 500000],
    caseSize: [36, 44],
  });
  
  const [otherInputs, setOtherInputs] = useState<{[K in keyof FilterKeys]: string}>({
    movement: '',
    material: '',
    style: '',
    dialColor: '',
    strapType: '',
    waterResistance: '',
    glassType: '',
    features: '',
  });

  const [isOtherSelected, setIsOtherSelected] = useState<{[K in keyof FilterKeys]?: boolean}>({});

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FeatureFinderOutput | null>(null);
  const { toast } = useToast();

  const handleAddCustomValue = (key: keyof FilterKeys, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherInputs[key].trim() !== '') {
        e.preventDefault();
        const newValue = otherInputs[key].trim();
        const currentValues = filters[key] as string[];
        if (!currentValues.includes(newValue)) {
            setFilters(prev => ({
                ...prev,
                [key]: [...currentValues, newValue]
            }));
        }
        setOtherInputs(prev => ({...prev, [key]: ''}));
    }
  };

  const handleRemoveValue = (key: keyof FilterKeys, value: string) => {
    const currentValues = filters[key] as string[];
    setFilters(prev => ({
        ...prev,
        [key]: currentValues.filter(v => v !== value)
    }));
  };
  
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
        movement: [], material: [], style: [], dialColor: [], strapType: [],
        waterResistance: [], glassType: [], features: [],
        priceRange: [0, 500000], caseSize: [36, 44],
    });
    setOtherInputs({
        movement: '', material: '', style: '', dialColor: '', strapType: '',
        waterResistance: '', glassType: '', features: ''
    });
    setIsOtherSelected({});
    setResult(null);
  }

  const MultiSelect = ({ title, options, filterKey }: { title: string; options: string[]; filterKey: keyof FilterKeys }) => {
    const selectedValues = filters[filterKey] as string[];
    
    const handleSelect = (option: string) => {
        if (option === OTHER_VALUE) {
            setIsOtherSelected(prev => ({...prev, [filterKey]: !prev[filterKey]}));
            return;
        }
        setFilters(prev => {
            const newValues = selectedValues.includes(option)
                ? selectedValues.filter(f => f !== option)
                : [...selectedValues, option];
            return { ...prev, [filterKey]: newValues };
        });
    };

    const currentSelectionText = () => {
        const customValues = selectedValues.filter(v => !options.includes(v));
        const selection = selectedValues.filter(v => options.includes(v));

        let textParts = [...selection];
        if (isOtherSelected[filterKey] || customValues.length > 0) {
            textParts.push('Other...');
        }
        
        return textParts.length > 0 ? textParts.join(', ') : `Select ${title}`;
    }
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    <span className="truncate">
                        {currentSelectionText()}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${title}...`} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map(option => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => handleSelect(option)}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValues.includes(option) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                             <CommandItem
                                onSelect={() => handleSelect(OTHER_VALUE)}
                                className="cursor-pointer"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        isOtherSelected[filterKey] ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                Other...
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
  };
  
  const CustomInputSection = ({filterKey, title}: {filterKey: keyof FilterKeys, title: string}) => {
    const customValues = (filters[filterKey] as string[]).filter(v => 
        ![...movementOptions, ...materialOptions, ...styleOptions, ...dialColorOptions, ...strapTypeOptions, ...waterResistanceOptions, ...glassTypeOptions, ...complicationOptions, ...smartFeatureOptions].includes(v)
    );
    
    if (!isOtherSelected[filterKey] && customValues.length === 0) return null;

    return (
      <div className="space-y-2">
          <Label>Other {title}</Label>
          <Input 
              placeholder={`Type ${title.toLowerCase()} and press Enter`}
              value={otherInputs[filterKey]}
              onChange={(e) => setOtherInputs(prev => ({...prev, [filterKey]: e.target.value}))}
              onKeyDown={(e) => handleAddCustomValue(filterKey, e)}
          />
           <div className="flex flex-wrap gap-1 pt-1">
              {customValues.map(value => (
                  <Badge key={value} variant="secondary" className="gap-1">
                      {value}
                      <button onClick={() => handleRemoveValue(filterKey, value)} className="rounded-full hover:bg-black/20">
                          <X className="h-3 w-3" />
                      </button>
                  </Badge>
              ))}
          </div>
      </div>
    );
  }

  return (
    <section>
      <Card className="bg-card/30 backdrop-blur-2xl border-white/20 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <Filter className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">WatchMatch</CardTitle>
          <CardDescription className="text-md">Find your perfect watch by selecting your desired features.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 border-b pb-8">
            <div className='space-y-2'>
              <Label>Movement</Label>
              <MultiSelect title="Movement" options={movementOptions} filterKey="movement" />
            </div>
            <div className='space-y-2'>
              <Label>Case Material</Label>
              <MultiSelect title="Case Material" options={materialOptions} filterKey="material" />
            </div>
             <div className='space-y-2'>
              <Label>Style</Label>
               <MultiSelect title="Style" options={styleOptions} filterKey="style" />
            </div>
            <div className='space-y-2'>
              <Label>Dial Color</Label>
              <MultiSelect title="Dial Color" options={dialColorOptions} filterKey="dialColor" />
            </div>
            <div className='space-y-2'>
              <Label>Strap Type</Label>
              <MultiSelect title="Strap Type" options={strapTypeOptions} filterKey="strapType" />
            </div>
            <div className='space-y-2'>
              <Label>Water Resistance</Label>
              <MultiSelect title="Water Resistance" options={waterResistanceOptions} filterKey="waterResistance" />
            </div>
            <div className='space-y-2'>
              <Label>Glass Type</Label>
              <MultiSelect title="Glass Type" options={glassTypeOptions} filterKey="glassType" />
            </div>
            <div className="space-y-2">
              <Label>Complications & Features</Label>
              <MultiSelect title="Complications & Features" options={[...complicationOptions, ...smartFeatureOptions]} filterKey="features" />
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
            <div className="space-y-2">
              <Label>Price Range (₹)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min price"
                  value={filters.priceRange[0] === 0 ? '' : filters.priceRange[0]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [value ? Number(value) : 0, prev.priceRange[1]],
                    }));
                  }}
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={filters.priceRange[1] === 500000 ? '' : filters.priceRange[1]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], value ? Number(value) : 500000],
                    }));
                  }}
                />
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CustomInputSection filterKey="movement" title="Movement" />
                <CustomInputSection filterKey="material" title="Case Material" />
                <CustomInputSection filterKey="style" title="Style" />
                <CustomInputSection filterKey="dialColor" title="Dial Color" />
                <CustomInputSection filterKey="strapType" title="Strap Type" />
                <CustomInputSection filterKey="waterResistance" title="Water Resistance" />
                <CustomInputSection filterKey="glassType" title="Glass Type" />
                <CustomInputSection filterKey="features" title="Features" />
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
                <h2 className="text-2xl font-bold text-center mb-8">Watch Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {result.watches.map(watch => (
                    <Card key={watch.name} className="overflow-hidden group flex flex-col bg-transparent backdrop-blur-xl border-white/20 shadow-lg">
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
