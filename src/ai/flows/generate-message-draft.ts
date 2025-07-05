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
  hudaNickname: z.string().describe('Huda’s nickname (e.g., Nooni).'),
  senderName: z.string().describe('Your name, the sender of the message.'),
  messageContext: z.string().describe('Context, a shared memory, or an inside joke to include.'),
  admiredQuality: z.string().describe("A quality you admire about her (e.g., her kindness, her humor)."),
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
  prompt: `You are a poetic and heartfelt AI assistant, a master of weaving words into beautiful, affectionate messages.
Your purpose is to help {{senderName}} craft a truly unique and memorable note for their cherished friend, {{hudaNickname}}.

The message must be filled with genuine warmth and feel incredibly personal.
Use creative, beautiful metaphors (like comparing her to a cozy dawn, a vibrant secret garden, or a lighthouse in a storm).
The tone should be deeply loving, slightly whimsical, and profoundly sincere. It should sound like it's coming directly from {{senderName}}'s heart, capturing the unique essence of their bond.

Avoid clichés and generic phrases. Focus on authenticity and depth of feeling.

Here is the information to use:
- A quality {{senderName}} admires: {{admiredQuality}}
- Context from {{senderName}}: {{messageContext}}

Now, write a beautiful, heartfelt message from {{senderName}} to {{hudaNickname}}:`
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
