import CompetitionCard from '@/components/competitions/competition-card';
import { getAllCompetitions } from '@/data/mock';
import type { Competition } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// This page will be a server component fetching initial data.
// For client-side filtering, a client component wrapper would be needed.
// For simplicity, we'll render all competitions.

export default function CompetitionsPage() {
  const competitions: Competition[] = getAllCompetitions();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-headline font-semibold">Competitions</h1>
        {/* Placeholder for search/filter controls if this were a client component */}
        {/* 
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search competitions..." className="pl-8" />
        </div>
        */}
      </div>

      {competitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((comp) => (
            <CompetitionCard key={comp.id} competition={comp} />
          ))}
        </div>
      ) : (
        <p>No competitions available at the moment.</p>
      )}
    </div>
  );
}
