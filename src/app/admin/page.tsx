import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Trophy, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-headline font-semibold flex items-center">
          <Settings className="mr-3 h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
      </div>
      <CardDescription>
        Manage various aspects of the Match Maestro platform from here.
      </CardDescription>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Manage Competitions
            </CardTitle>
            <CardDescription>
              Create, view, edit, and delete competitions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled className="w-full">
              Go to Competition Management (Soon)
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Manage Teams
            </CardTitle>
            <CardDescription>
              Add new teams, update team details, and manage player rosters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled className="w-full">
              Go to Team Management (Soon)
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
              Manage Matches
            </CardTitle>
            <CardDescription>
              Update match scores, schedules, and other match-related information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled className="w-full">
              Go to Match Management (Soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-muted/30">
        <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
            <CardDescription>Configure global settings for the application.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Further administrative tools and settings will be available here.</p>
            <Button variant="secondary" disabled className="mt-4">
                Access Platform Settings (Soon)
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
