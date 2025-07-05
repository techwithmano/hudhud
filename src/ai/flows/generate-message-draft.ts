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
  prompt: `You are a friendly AI assistant who is good at writing sweet and simple messages.
Your goal is to help {{senderName}} write a special message for their good friend, {{hudaNickname}}.

The message should be warm, friendly, and personal.
Use simple and nice comparisons. For example, you can say she is like a sunny day.
The tone should be loving and sound like it came straight from {{senderName}}. It should be simple and clear.

Don't use fancy words. Just be honest and kind.

Here is the information to use:
- A quality {{senderName}} admires: {{admiredQuality}}
- Context from {{senderName}}: {{messageContext}}

Now, write a sweet and simple message from {{senderName}} to {{hudaNickname}}:`
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
