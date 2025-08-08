
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
For each suggestion, provide a brief, one-sentence reason why it's a good fit, and a valid URL to a website where the watch can be purchased. When possible, prioritize links from reputable online retailers or the brand's official website.
If a filter array is empty, it means the user has no preference for that category.
The user has specified the price in Indian Rupees (INR).

User Criteria:
- Style(s): {{#if style}}{{#each style}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Movement(s): {{#if movement}}{{#each movement}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Material(s): {{#if material}}{{#each material}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Price Range: ₹{{{priceRange.[0]}}} - ₹{{{priceRange.[1]}}}
- Case Size: {{{caseSize.[0]}}}mm - {{{caseSize.[1]}}}mm
- Dial Color(s): {{#if dialColor}}{{#each dialColor}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Strap Type(s): {{#if strapType}}{{#each strapType}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Water Resistance(s): {{#if waterResistance}}{{#each waterResistance}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
- Glass Type(s): {{#if glassType}}{{#each glassType}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}Any{{/if}}
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

    