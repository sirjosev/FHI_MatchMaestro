'use client';

import { useState, useEffect } from 'react';
import { generateMatchSummary, type MatchSummaryInput, type MatchSummaryOutput } from '@/ai/flows/match-storyteller';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface MatchStorytellerClientProps {
  matchId: string;
  matchDetails: string; // e.g., "Team A vs Team B, crucial playoff match"
  matchStatus: 'Scheduled' | 'Live' | 'Completed';
  score?: string; // e.g., "2-1", only if completed
  keyEvents?: string; // e.g., "Player X scored at 10', Player Y red card at 30'", only if completed
}

export default function MatchStorytellerClient({
  matchId,
  matchDetails,
  matchStatus,
  score,
  keyEvents,
}: MatchStorytellerClientProps) {
  const [story, setStory] = useState<MatchSummaryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchStory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const input: MatchSummaryInput = {
        matchDetails,
        matchStatus,
      };
      if (matchStatus === 'Completed') {
        if (!score || !keyEvents) {
          throw new Error('Score and key events are required for completed matches.');
        }
        input.score = score;
        input.keyEvents = keyEvents;
      }
      const result = await generateMatchSummary(input);
      setStory(result);
    } catch (e) {
      console.error('Error generating match story:', e);
      setError(e instanceof Error ? e.message : 'Failed to generate match story.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optionally auto-fetch if panel is open or based on some other condition
    // For now, let's require a button click to fetch
  }, [matchId, matchDetails, matchStatus, score, keyEvents]);

  const handleTogglePanel = () => {
    setIsPanelOpen(prev => !prev);
    if (!prev && !story && !isLoading && !error) { // If opening for the first time and no data/loading/error
      fetchStory();
    }
  }

  const contentToDisplay = matchStatus === 'Completed' ? story?.summary : story?.preview;
  const titleText = matchStatus === 'Completed' ? "Match Recap" : "Match Preview";

  return (
    <Card className="bg-card/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-accent" />
            AI Match Narrative
          </CardTitle>
          <CardDescription>
            {isPanelOpen ? (matchStatus === 'Completed' ? 'AI-generated summary of the match.' : 'AI-generated preview of the match.') : 'Click to view AI narrative.'}
          </CardDescription>
        </div>
        <Button onClick={handleTogglePanel} variant="ghost" size="sm">
          {isPanelOpen ? 'Hide' : 'View'} Narrative
        </Button>
      </CardHeader>
      {isPanelOpen && (
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center p-6 text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
              <span>Generating narrative...</span>
            </div>
          )}
          {error && !isLoading && (
            <Alert variant="destructive" className="my-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <Button onClick={fetchStory} variant="outline" size="sm" className="mt-2">Retry</Button>
            </Alert>
          )}
          {!isLoading && !error && story && contentToDisplay && (
            <div className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-md bg-background">
              <h3 className="font-semibold text-md">{titleText}</h3>
              <p className="text-sm">{contentToDisplay}</p>
            </div>
          )}
          {!isLoading && !error && story && !contentToDisplay && (
             <p className="text-sm text-muted-foreground p-4 border rounded-md bg-background">
              {matchStatus === 'Live' ? 'Narrative will be available once the match is completed or scheduled.' : 'No narrative available for this match status.'}
            </p>
          )}
          {!isLoading && !error && !story && (
             <div className="text-center p-4">
                <Button onClick={fetchStory} variant="default" size="sm">
                    Generate Narrative
                </Button>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
