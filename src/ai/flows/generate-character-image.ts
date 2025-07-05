'use server';
/**
 * @fileOverview Generates a character portrait based on a description.
 *
 * - generateCharacterImage - A function that generates an image of a character.
 * - GenerateCharacterInput - The input type for the generateCharacterImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateCharacterInputSchema = z.object({
  description: z.string().describe('A description of the character to generate.'),
});
export type GenerateCharacterInput = z.infer<typeof GenerateCharacterInputSchema>;

export async function generateCharacterImage(input: GenerateCharacterInput) {
  const {media} = await ai.generate({
    model: 'googleai/gemini-2.0-flash-preview-image-generation',
    prompt: `Generate a circular portrait of a character with a simple, solid light-colored background. The character should be in a whimsical, Ghibli-inspired anime style. Description: ${input.description}`,
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  if (!media || !media.url) {
      throw new Error('Image generation failed.');
  }

  return { imageDataUri: media.url };
}
