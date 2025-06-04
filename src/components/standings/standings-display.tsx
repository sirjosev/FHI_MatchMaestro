
import type { StandingEntry, Competition } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

interface StandingsDisplayProps {
  standings: Competition['standings'];
  competitionName: string;
}

export default function StandingsDisplay({ standings, competitionName }: StandingsDisplayProps) {
  if (!standings || standings.length === 0 || standings.every(pool => pool.entries.length === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Standings are not available for this competition yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Team Standings</CardTitle>
        <CardDescription>Current standings for {competitionName}.</CardDescription>
      </CardHeader>
      <CardContent>
        {standings.map((pool, index) => (
          <div key={pool.poolName || index} className="mb-6 last:mb-0">
            {pool.poolName && <h3 className="text-lg font-semibold mb-2">{pool.poolName}</h3>}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">P</TableHead>
                    <TableHead className="text-center">W</TableHead>
                    <TableHead className="text-center">D</TableHead>
                    <TableHead className="text-center">L</TableHead>
                    <TableHead className="text-center">GF</TableHead>
                    <TableHead className="text-center">GA</TableHead>
                    <TableHead className="text-center">GD</TableHead>
                    <TableHead className="text-center font-semibold">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pool.entries.map((entry, idx) => (
                    <TableRow key={entry.teamId} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {entry.teamLogoUrl && <Image src={entry.teamLogoUrl} alt={`${entry.teamName} logo`} width={24} height={24} className="rounded-full" data-ai-hint="team logo" />}
                          <span>{entry.teamName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{entry.played}</TableCell>
                      <TableCell className="text-center">{entry.won}</TableCell>
                      <TableCell className="text-center">{entry.drawn}</TableCell>
                      <TableCell className="text-center">{entry.lost}</TableCell>
                      <TableCell className="text-center">{entry.goalsFor}</TableCell>
                      <TableCell className="text-center">{entry.goalsAgainst}</TableCell>
                      <TableCell className="text-center">{entry.goalDifference}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{entry.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

