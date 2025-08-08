import {z} from 'zod';

export const FeatureFinderInputSchema = z.object({
  movement: z.array(z.string()).describe("A list of desired watch movements (e.g., 'Automatic', 'Quartz'). Can be empty."),
  material: z.array(z.string()).describe("A list of desired case materials (e.g., 'Stainless Steel', 'Titanium'). Can be empty."),
  style: z.array(z.string()).describe("A list of desired watch styles (e.g., 'Dive', 'Dress'). Can be empty."),
  dialColor: z.array(z.string()).describe("A list of desired dial colors (e.g., 'Black', 'Blue'). Can be empty."),
  strapType: z.array(z.string()).describe("A list of desired strap types (e.g., 'Leather', 'Metal bracelet'). Can be empty."),
  waterResistance: z.array(z.string()).describe("A list of desired water resistance levels (e.g., '100m'). Can be empty."),
  glassType: z.array(z.string()).describe("A list of desired glass types (e.g., 'Sapphire'). Can be empty."),
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
