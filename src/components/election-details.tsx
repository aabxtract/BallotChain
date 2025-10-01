import type { Election, NewCandidate } from '@/lib/types';
import { AddCandidateForm } from './add-candidate-form';
import { CandidateCard } from './candidate-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gavel, Users, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type ElectionDetailsProps = {
  election: Election | null;
  onAddCandidate: (data: NewCandidate) => Promise<void>;
  onStartElection: (id: string) => void;
  isValidationLoading: boolean;
};

export function ElectionDetails({
  election,
  onAddCandidate,
  onStartElection,
  isValidationLoading,
}: ElectionDetailsProps) {
  if (!election) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 dark:bg-gray-900/20">
        <Info className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Select an Election</h3>
        <p className="text-muted-foreground">
          Choose an election from the list to view its details and candidates.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
    <div className="p-6">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">{election.name}</h2>
          {election.isStarted && (
            <Badge className="mt-2 text-accent-foreground bg-accent">Election Started</Badge>
          )}
        </div>
        {!election.isStarted && (
          <Button onClick={() => onStartElection(election.id)}>
            <Gavel className="w-4 h-4 mr-2" />
            Start Election
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="flex items-center mb-4 text-2xl font-semibold">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Candidates ({election.candidates.length})
          </h3>
          {election.candidates.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {election.candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No candidates have been added yet.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          {!election.isStarted ? (
            <AddCandidateForm onSubmit={onAddCandidate} isLoading={isValidationLoading} />
          ) : (
            <div className="p-8 text-center border-2 border-dashed rounded-lg bg-muted/50">
              <h4 className="font-semibold">Submissions Closed</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                This election has started, and new candidates can no longer be added.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </ScrollArea>
  );
}
