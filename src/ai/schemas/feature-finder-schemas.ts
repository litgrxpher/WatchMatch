import {z} from 'zod';

export const FeatureFinderInputSchema = z.object({
  movement: z.string().describe("The desired watch movement (e.g., 'Automatic', 'Quartz', 'Manual', 'Smart', 'all')."),
  material: z.string().describe("The desired case material (e.g., 'Stainless Steel', 'Titanium', 'Gold', 'Ceramic', 'Bronze', 'Carbon fiber', 'Platinum', 'all')."),
  style: z.string().describe("The desired watch style (e.g., 'Dive', 'Dress', 'Pilot', 'Field', 'Racing', 'Minimalist', 'all')."),
  dialColor: z.string().describe("The desired dial color (e.g., 'Black', 'Blue', 'White', 'Green', 'Silver', 'all')."),
  strapType: z.string().describe("The desired strap type (e.g., 'Leather', 'Metal bracelet', 'Rubber', 'NATO/nylon', 'Ceramic', 'all')."),
  waterResistance: z.string().describe("The desired water resistance (e.g., 'Any', 'Up to 50m', '100m', '200m+')."),
  glassType: z.string().describe("The desired glass type (e.g., 'Sapphire', 'Mineral', 'Acrylic', 'all')."),
  features: z.array(z.string()).describe("A list of desired features/complications (e.g., 'Chronograph', 'GMT'). Can be empty."),
  priceRange: z.array(z.number()).length(2).describe("A tuple representing the minimum and maximum price range. e.g. [500, 2000]"),
  caseSize: z.array(z.number()).length(2).describe("A tuple representing the minimum and maximum case size in millimeters. e.g. [38, 42]"),
});
export type FeatureFinderInput = z.infer<typeof FeatureFinderInputSchema>;

const WatchSuggestionSchema = z.object({
  brand: z.string().describe("The brand of the suggested watch."),
  name: z.string().describe("The model name of the suggested watch."),
  style: z.string().describe("The style of the watch (e.g., 'Dive', 'Dress')."),
  reason: z.string().describe("A brief (1 sentence) reason why this watch is a good match."),
  purchaseUrl: z.string().describe("A URL to a site where the watch can be purchased from."),
});

export const FeatureFinderOutputSchema = z.object({
  watches: z.array(WatchSuggestionSchema).describe("An array of up to 8 watch suggestions."),
});
export type FeatureFinderOutput = z.infer<typeof FeatureFinderOutputSchema>;
