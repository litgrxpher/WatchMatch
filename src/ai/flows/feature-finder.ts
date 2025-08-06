'use server';

/**
 * @fileOverview A Genkit flow to find watch recommendations based on specific feature filters.
 * @exports {
 *   featureFinder: (input: FeatureFinderInput) => Promise<FeatureFinderOutput>;
 * }
 */

import {ai} from '@/ai/genkit';
import type {FeatureFinderInput, FeatureFinderOutput} from '@/ai/schemas/feature-finder-schemas';
import {FeatureFinderInputSchema, FeatureFinderOutputSchema} from '@/ai/schemas/feature-finder-schemas';


export async function featureFinder(input: FeatureFinderInput): Promise<FeatureFinderOutput> {
  return featureFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'featureFinderPrompt',
  input: {schema: FeatureFinderInputSchema},
  output: {schema: FeatureFinderOutputSchema},
  prompt: `You are an expert watch concierge. Based on the user's criteria, suggest up to 8 specific watch models (brand and name).
For each suggestion, provide a brief, one-sentence reason why it's a good fit, and a valid URL to a website where the watch can be purchased. When possible, prioritize links from Amazon.in or Flipkart.com.
If a filter is set to 'all', 'any', or is an empty string, it means the user has no preference for that category.
The user has specified the price in Indian Rupees (INR).

User Criteria:
- Style: {{{style}}}
- Movement: {{{movement}}}
- Material: {{{material}}}
- Price Range: ₹{{{priceRange.[0]}}} - ₹{{{priceRange.[1]}}}
- Case Size: {{{caseSize.[0]}}}mm - {{{caseSize.[1]}}}mm
- Dial Color: {{{dialColor}}}
- Strap Type: {{{strapType}}}
- Water Resistance: {{{waterResistance}}}
- Glass Type: {{{glassType}}}
- Desired Complications and Features: {{#if features}}{{#each features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}None specified{{/if}}

Provide your response in the requested JSON format.
`,
});

const featureFinderFlow = ai.defineFlow(
  {
    name: 'featureFinderFlow',
    inputSchema: FeatureFinderInputSchema,
    outputSchema: FeatureFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
