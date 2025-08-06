'use server';

/**
 * @fileOverview This file defines a Genkit flow for the WatchMatch AI quiz.
 *
 * The quiz gathers user preferences on lifestyle, style, budget, and desired features to suggest matching watches.
 *
 * @exports {
 *   watchMatchQuiz: (input: WatchMatchQuizInput) => Promise<WatchMatchQuizOutput>;
 *   WatchMatchQuizInput: type
 *   WatchMatchQuizOutput: type
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WatchMatchQuizInputSchema = z.object({
  lifestyle: z
    .string()
    .describe('Describe your typical daily activities and lifestyle.'),
  stylePreferences: z
    .string()
    .describe('Describe your style preferences (e.g., classic, modern, sporty).'),
  budget: z.string().describe('What is your budget range for a watch?'),
  desiredFeatures: z
    .string()
    .describe(
      'List any specific features you desire in a watch (e.g., chronograph, water resistance, GPS).'
    ),
});

export type WatchMatchQuizInput = z.infer<typeof WatchMatchQuizInputSchema>;

const WatchMatchQuizOutputSchema = z.object({
  suggestedWatches: z
    .string()
    .describe(
      'A list of suggested watch models based on the user input, including brand and model name for each watch, separated by commas.'
    ),
  reasoning: z
    .string()
    .describe(
      'A brief explanation of why these watches match the users preferences.'
    ),
});

export type WatchMatchQuizOutput = z.infer<typeof WatchMatchQuizOutputSchema>;

export async function watchMatchQuiz(input: WatchMatchQuizInput): Promise<WatchMatchQuizOutput> {
  return watchMatchQuizFlow(input);
}

const watchMatchQuizPrompt = ai.definePrompt({
  name: 'watchMatchQuizPrompt',
  input: {schema: WatchMatchQuizInputSchema},
  output: {schema: WatchMatchQuizOutputSchema},
  prompt: `You are a personal watch consultant AI assistant. Given the users preferences, suggest a list of watches that they should consider.

Lifestyle: {{{lifestyle}}}
Style Preferences: {{{stylePreferences}}}
Budget: {{{budget}}}
Desired Features: {{{desiredFeatures}}}

Based on these preferences, suggest a comma separated list of watches. Include the brand and model name. Then, explain why the watches match the provided preferences.

Output in JSON format:
{
  "suggestedWatches": "comma separated list of watch suggestions",
    "reasoning": "explanation of why these watches match the users preferences"
}
`,
});

const watchMatchQuizFlow = ai.defineFlow(
  {
    name: 'watchMatchQuizFlow',
    inputSchema: WatchMatchQuizInputSchema,
    outputSchema: WatchMatchQuizOutputSchema,
  },
  async input => {
    const {output} = await watchMatchQuizPrompt(input);
    return output!;
  }
);
