import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Welcome to Match Maestro!</CardTitle>
          <CardDescription className="text-lg">
            Your central hub for managing and viewing hockey tournaments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Navigate through competitions, schedules, standings, and much more using the sidebar. 
            Get ready to experience seamless tournament management.
          </p>
          <div className="flex gap-4">
            <Link href="/competitions" passHref>
              <Button variant="default" size="lg">
                View Competitions <Trophy className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card data-ai-hint="sports action">
          <CardHeader>
            <CardTitle>Live Action</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/600x400.png" alt="Hockey action" width={600} height={400} className="rounded-md object-cover aspect-video" />
            <p className="mt-2 text-sm text-muted-foreground">Experience the thrill of live matches and real-time updates.</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="team huddle">
          <CardHeader>
            <CardTitle>Team Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/600x400.png" alt="Team huddle" width={600} height={400} className="rounded-md object-cover aspect-video" />
            <p className="mt-2 text-sm text-muted-foreground">Dive deep into team statistics and player profiles.</p>
          </CardContent>
        </Card>
        <Card data-ai-hint="trophy celebration">
          <CardHeader>
            <CardTitle>Championship Glory</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src="https://placehold.co/600x400.png" alt="Championship trophy" width={600} height={400} className="rounded-md object-cover aspect-video" />
            <p className="mt-2 text-sm text-muted-foreground">Follow tournaments from start to finish and see who takes home the cup.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
