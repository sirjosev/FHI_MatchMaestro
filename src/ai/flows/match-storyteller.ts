// src/ai/flows/match-storyteller.ts
'use server';

/**
 * @fileOverview A match storytelling AI agent.
 *
 * - generateMatchSummary - A function that generates match previews and summaries.
 * - MatchSummaryInput - The input type for the generateMatchSummary function.
 * - MatchSummaryOutput - The return type for the generateMatchSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchSummaryInputSchema = z.object({
  matchDetails: z
    .string()
    .describe('Detailed information about the match, including teams, date, and context.'),
  matchStatus: z
    .enum(['Scheduled', 'Live', 'Completed'])
    .describe('The current status of the match.'),
  score: z.string().optional().describe('The score of the match (e.g., 2-1). Required for completed matches.'),
  keyEvents: z.string().optional().describe('Key events during the match. Required for completed matches.'),
});

export type MatchSummaryInput = z.infer<typeof MatchSummaryInputSchema>;

const MatchSummaryOutputSchema = z.object({
  preview: z.string().describe('A brief preview of the match.'),
  summary: z.string().describe('A summary of the match.'),
});

export type MatchSummaryOutput = z.infer<typeof MatchSummaryOutputSchema>;

export async function generateMatchSummary(input: MatchSummaryInput): Promise<MatchSummaryOutput> {
  return matchStorytellerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchStorytellerPrompt',
  input: {schema: MatchSummaryInputSchema},
  output: {schema: MatchSummaryOutputSchema},
  prompt: `You are an expert sports journalist specializing in hockey.

You will generate a brief preview and a summary of the match based on the match status.

Match Details: {{{matchDetails}}}
Match Status: {{{matchStatus}}}

{{#if score}}
Score: {{{score}}}
{{/if}}

{{#if keyEvents}}
Key Events: {{{keyEvents}}}
{{/if}}


If the match is scheduled, generate a preview.
If the match is completed, generate a summary.

Make them short and concise.

Preview:
{{output preview}}

Summary:
{{output summary}}`,
});

const matchStorytellerFlow = ai.defineFlow(
  {
    name: 'matchStorytellerFlow',
    inputSchema: MatchSummaryInputSchema,
    outputSchema: MatchSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
