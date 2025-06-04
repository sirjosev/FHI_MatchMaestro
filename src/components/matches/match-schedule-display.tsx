import type { Match, Team } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, Swords, Sparkles, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import MatchStorytellerClient from '@/components/ai/match-storyteller-client';

interface MatchScheduleDisplayProps {
  matches: Match[];
  competitionName: string;
}

const TeamDisplay = ({ team }: { team: Team }) => (
  <div className="flex items-center gap-2">
    {team.logoUrl && <Image src={team.logoUrl} alt={`${team.name} logo`} width={24} height={24} className="rounded-full" data-ai-hint="team logo"/>}
    <span className="font-medium">{team.name}</span>
  </div>
);

export default function MatchScheduleDisplay({ matches, competitionName }: MatchScheduleDisplayProps) {
  if (!matches || matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Match Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No matches scheduled for this competition yet.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusVariant = (status: Match['status']) => {
    switch (status) {
      case 'Scheduled': return 'outline';
      case 'Live': return 'destructive';
      case 'Completed': return 'secondary';
      case 'Postponed': return 'default'; // Or another specific color
      default: return 'default';
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Match Schedule</CardTitle>
        <CardDescription>Upcoming and past matches for {competitionName}.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-muted/30 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarClock className="h-4 w-4" />
                    <span>{format(new Date(match.date), 'EEE, MMM d, yyyy')} at {match.time}</span>
                  </div>
                  <Badge variant={getStatusVariant(match.status)} className="text-xs">{match.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
                  <TeamDisplay team={match.teamA} />
                  <div className="flex flex-col items-center">
                    {match.status === 'Completed' || match.status === 'Live' ? (
                      <span className="text-2xl font-bold text-primary">
                        {match.scoreA ?? 0} - {match.scoreB ?? 0}
                      </span>
                    ) : (
                      <Swords className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <TeamDisplay team={match.teamB} />
                </div>

                {match.status === 'Completed' && typeof match.scoreA === 'number' && typeof match.scoreB === 'number' && (
                  <div className="mt-2 text-xs text-center text-muted-foreground border-t pt-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                       <TrendingUp className="h-3 w-3 text-primary" /> Points from this match:
                    </div>
                    <div className="flex justify-around">
                      <span>{match.teamA.name}: {match.scoreA > match.scoreB ? '+3' : (match.scoreA === match.scoreB ? '+1' : '+0')}</span>
                      <span>{match.teamB.name}: {match.scoreB > match.scoreA ? '+3' : (match.scoreA === match.scoreB ? '+1' : '+0')}</span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 pt-2">
                  <MapPin className="h-3 w-3"/> 
                  {match.venue}
                </div>
                
                <MatchStorytellerClient
                    matchId={match.id}
                    matchDetails={`${match.teamA.name} vs ${match.teamB.name} in ${competitionName}`}
                    matchStatus={match.status}
                    score={ (match.scoreA !== undefined && match.scoreB !== undefined) ? `${match.scoreA}-${match.scoreB}` : undefined}
                    keyEvents={match.keyEventsSummary}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
