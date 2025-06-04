import { getCompetitionById } from '@/data/mock';
import type { Competition } from '@/types';
import CompetitionDetailsDisplay from '@/components/competitions/competition-details-display';
import MatchScheduleDisplay from '@/components/matches/match-schedule-display';
import StandingsDisplay from '@/components/standings/standings-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompetitionDetailPageProps {
  params: { id: string };
}

export default function CompetitionDetailPage({ params }: CompetitionDetailPageProps) {
  const competition: Competition | undefined = getCompetitionById(params.id);

  if (!competition) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Competition not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CompetitionDetailsDisplay competition={competition} />
      
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-2"> {/* Adjusted for 2 tabs for now */}
          <TabsTrigger value="schedule">Schedule & Narratives</TabsTrigger>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          {/* <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger> */}
        </TabsList>
        <TabsContent value="schedule" className="mt-6">
          <MatchScheduleDisplay matches={competition.matches} competitionName={competition.name} />
        </TabsContent>
        <TabsContent value="standings" className="mt-6">
          <StandingsDisplay standings={competition.standings} competitionName={competition.name} />
        </TabsContent>
        {/* 
        <TabsContent value="teams">
          Teams component here...
        </TabsContent>
        <TabsContent value="statistics">
          Statistics component here...
        </TabsContent>
        */}
      </Tabs>
    </div>
  );
}

export async function generateStaticParams() {
  // In a real app, fetch all competition IDs
  const competitions = [{ id: 'comp-1' }, { id: 'comp-2' }, { id: 'comp-3' }];
  return competitions.map((comp) => ({
    id: comp.id,
  }));
}
