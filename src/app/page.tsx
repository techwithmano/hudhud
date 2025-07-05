import Game from "@/components/game/Game";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md text-center">
            <CardHeader>
              <CardTitle>Loading Your Magical Garden...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please wait while we prepare this special world for you.</p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <Game />
    </Suspense>
  );
}
