import type { Competition } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const { id, name, startDate, endDate, location, status, type, description } = competition;

  const getStatusVariant = (status: Competition['status']) => {
    switch (status) {
      case 'In Progress': return 'default';
      case 'Completed': return 'secondary';
      case 'Published': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl text-primary">{name}</CardTitle>
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
        </div>
        <CardDescription className="text-sm">{type}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>{format(new Date(startDate), 'MMM d, yyyy')} - {format(new Date(endDate), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{location}</span>
        </div>
        {description && <p className="text-sm line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter>
        <Link href={`/competitions/${id}`} passHref className="w-full">
          <Button variant="outline" className="w-full">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
