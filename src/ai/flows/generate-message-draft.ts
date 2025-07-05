// src/ai/flows/generate-message-draft.ts
'use server';

/**
 * @fileOverview A message draft generator for creating personalized, sweet messages for Huda.
 *
 * - generateMessageDraft - A function that generates a draft of a personalized message.
 * - GenerateMessageDraftInput - The input type for the generateMessageDraft function.
 * - GenerateMessageDraftOutput - The return type for the generateMessageDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMessageDraftInputSchema = z.object({
  hudaNickname: z.string().describe('Huda\u2019s nickname (e.g., Nooni).'),
  senderName: z.string().describe('Your name, the sender of the message.'),
  messageContext: z.string().describe('Context or memories to personalize the message.'),
});
export type GenerateMessageDraftInput = z.infer<typeof GenerateMessageDraftInputSchema>;

const GenerateMessageDraftOutputSchema = z.object({
  draftMessage: z.string().describe('A draft of a personalized, sweet message for Huda.'),
});
export type GenerateMessageDraftOutput = z.infer<typeof GenerateMessageDraftOutputSchema>;

export async function generateMessageDraft(input: GenerateMessageDraftInput): Promise<GenerateMessageDraftOutput> {
  return generateMessageDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMessageDraftPrompt',
  input: {schema: GenerateMessageDraftInputSchema},
  output: {schema: GenerateMessageDraftOutputSchema},
  prompt: `You are a heartfelt message generator. Generate a sweet, personalized message for {{hudaNickname}}, from {{senderName}}.\n\nContext: {{messageContext}}\n\nMessage Draft:`,
});

const generateMessageDraftFlow = ai.defineFlow(
  {
    name: 'generateMessageDraftFlow',
    inputSchema: GenerateMessageDraftInputSchema,
    outputSchema: GenerateMessageDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
