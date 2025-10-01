import type { Election } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type ElectionListProps = {
  elections: Election[];
  selectedElectionId: string | null;
  onSelectElection: (id: string) => void;
  onCreateElection: () => void;
};

export function ElectionList({
  elections,
  selectedElectionId,
  onSelectElection,
  onCreateElection,
}: ElectionListProps) {
  return (
    <aside className="flex flex-col p-4 border-r bg-card">
      <h2 className="px-2 text-lg font-semibold tracking-tight">Elections</h2>
      <div className="flex-1 mt-4 space-y-2">
        {elections.map((election) => (
          <Button
            key={election.id}
            variant="ghost"
            onClick={() => onSelectElection(election.id)}
            className={cn(
              'w-full justify-start',
              selectedElectionId === election.id && 'bg-muted text-primary'
            )}
          >
            <FileText className="w-4 h-4 mr-2" />
            {election.name}
          </Button>
        ))}
      </div>
      <Button onClick={onCreateElection}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create New Election
      </Button>
    </aside>
  );
}
