import type { Competition } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Info, Users, Trophy } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

interface CompetitionDetailsDisplayProps {
  competition: Competition;
}

export default function CompetitionDetailsDisplay({ competition }: CompetitionDetailsDisplayProps) {
  const { name, startDate, endDate, location, status, type, description, teams } = competition;

  const getStatusVariant = (status: Competition['status']) => {
    switch (status) {
      case 'In Progress': return 'default';
      case 'Completed': return 'secondary';
      case 'Published': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="w-full shadow-lg" data-ai-hint="stadium competition">
      <div className="relative h-48 w-full">
        <Image 
          src={`https://placehold.co/1200x300.png`} 
          alt={`${name} banner`} 
          layout="fill" 
          objectFit="cover" 
          className="rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg"></div>
        <div className="absolute bottom-4 left-4">
          <CardTitle className="font-headline text-3xl text-white">{name}</CardTitle>
          <Badge variant={getStatusVariant(status)} className="mt-1 text-sm">{status}</Badge>
        </div>
      </div>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start p-3 bg-muted/50 rounded-md">
            <CalendarDays className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Dates</p>
              <p className="text-muted-foreground">{format(new Date(startDate), 'PPP')} - {format(new Date(endDate), 'PPP')}</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-muted/50 rounded-md">
            <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-muted-foreground">{location}</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-muted/50 rounded-md">
            <Trophy className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Type</p>
              <p className="text-muted-foreground">{type}</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-muted/50 rounded-md">
            <Users className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">Teams</p>
              <p className="text-muted-foreground">{teams.length} participating</p>
            </div>
          </div>
        </div>
        
        {description && (
          <div className="flex items-start p-3 border rounded-md">
            <Info className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold">About this Competition</p>
              <p className="text-muted-foreground whitespace-pre-line">{description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
