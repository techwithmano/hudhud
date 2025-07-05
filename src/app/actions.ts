'use server';

import { generateMessageDraft } from '@/ai/flows/generate-message-draft';
import { z } from 'zod';

const ActionInputSchema = z.object({
  hudaNickname: z.string().min(1, "Nickname is required."),
  senderName: z.string().min(1, "Sender name is required."),
  messageContext: z.string().min(10, "Context must be at least 10 characters long."),
  admiredQuality: z.string().min(3, "Please mention a quality you admire."),
});

export async function handleGenerateDraft(formData: FormData) {
  const rawFormData = {
    hudaNickname: formData.get('hudaNickname'),
    senderName: formData.get('senderName'),
    messageContext: formData.get('messageContext'),
    admiredQuality: formData.get('admiredQuality'),
  };

  const validation = ActionInputSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateMessageDraft(validation.data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('AI draft generation failed:', error);
    return {
      success: false,
      error: { _form: ['An unexpected error occurred. Please try again.'] },
    };
  }
}
