import {z} from 'zod';

export const FeatureFinderInputSchema = z.object({
  movement: z.string().describe("The desired watch movement (e.g., 'Automatic', 'Quartz', 'Manual', 'all')."),
  material: z.string().describe("The desired case material (e.g., 'Stainless Steel', 'Titanium', 'all')."),
  style: z.string().describe("The desired watch style (e.g., 'Dive', 'Dress', 'Pilot', 'all')."),
  features: z.array(z.string()).describe("A list of desired features (e.g., 'Chronograph', 'GMT'). Can be empty."),
  priceRange: z.array(z.number()).length(2).describe("A tuple representing the minimum and maximum price range. e.g. [500, 2000]"),
  caseSize: z.array(z.number()).length(2).describe("A tuple representing the minimum and maximum case size in millimeters. e.g. [38, 42]"),
});
export type FeatureFinderInput = z.infer<typeof FeatureFinderInputSchema>;

const WatchSuggestionSchema = z.object({
  brand: z.string().describe("The brand of the suggested watch."),
  name: z.string().describe("The model name of the suggested watch."),
  style: z.string().describe("The style of the watch (e.g., 'Dive', 'Dress')."),
  reason: z.string().describe("A brief (1 sentence) reason why this watch is a good match."),
  imageUrl: z.string().describe("A URL for a placeholder image of the watch."),
});

export const FeatureFinderOutputSchema = z.object({
  watches: z.array(WatchSuggestionSchema).describe("An array of up to 8 watch suggestions."),
});
export type FeatureFinderOutput = z.infer<typeof FeatureFinderOutputSchema>;
