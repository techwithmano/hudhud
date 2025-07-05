import MessageGenerator from '@/components/tool/MessageGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function MessageToolPage() {
  return (
    <div className="min-h-screen bg-background/80 p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">AI Message Helper</CardTitle>
            <CardDescription>
              Create a heartfelt message for Nooni. Provide some details, and our AI will help you draft a sweet note.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessageGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
