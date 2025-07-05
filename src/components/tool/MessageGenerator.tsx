'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleGenerateDraft } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const initialState = {
  success: false,
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <><Wand2 className="mr-2 h-4 w-4" /> Generate Draft</>}
    </Button>
  );
}

export default function MessageGenerator() {
  const [state, formAction] = useFormState(handleGenerateDraft, initialState as any);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.success && state.data) {
      toast({
        title: 'Draft Generated!',
        description: 'Your personalized message is ready below.',
      });
      if(resultRef.current) {
        resultRef.current.value = state.data.draftMessage;
      }
      formRef.current?.reset();
    } else if (!state.success && state.error) {
       const errorMessage = state.error._form ? state.error._form[0] : "Please check your inputs.";
       toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: errorMessage,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} ref={formRef} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hudaNickname">Her Nickname</Label>
          <Input id="hudaNickname" name="hudaNickname" placeholder="e.g., Nooni" required />
          {state?.error?.hudaNickname && <p className="text-sm text-destructive">{state.error.hudaNickname[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderName">Your Name</Label>
          <Input id="senderName" name="senderName" placeholder="Your name" required />
          {state?.error?.senderName && <p className="text-sm text-destructive">{state.error.senderName[0]}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="messageContext">A Memory or Feeling</Label>
        <Textarea
          id="messageContext"
          name="messageContext"
          placeholder="Share a memory, an inside joke, or a feeling... e.g., 'Remember that time we...'"
          rows={3}
          required
        />
        {state?.error?.messageContext && <p className="text-sm text-destructive">{state.error.messageContext[0]}</p>}
      </div>
       <div className="space-y-2">
          <Label htmlFor="admiredQuality">A Quality You Admire</Label>
          <Input id="admiredQuality" name="admiredQuality" placeholder="e.g., Her incredible kindness, her hilarious laugh" required />
          {state?.error?.admiredQuality && <p className="text-sm text-destructive">{state.error.admiredQuality[0]}</p>}
      </div>
      <SubmitButton />

      {state?.data?.draftMessage && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="draftMessage">Generated Draft</Label>
          <Card>
            <CardContent className="p-4">
               <Textarea
                id="draftMessage"
                ref={resultRef}
                defaultValue={state.data.draftMessage}
                rows={8}
                className="bg-secondary border-0"
                readOnly
              />
            </CardContent>
          </Card>
        </div>
      )}
    </form>
  );
}
