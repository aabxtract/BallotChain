'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { elections, type Election } from '@/lib/elections';
import Link from 'next/link';

function getStatus(election: Election, currentBlock: number): 'Upcoming' | 'Active' | 'Ended' {
  if (currentBlock < election.startBlock) return 'Upcoming';
  if (currentBlock >= election.startBlock && currentBlock <= election.endBlock) return 'Active';
  return 'Ended';
}

function ElectionCard({ election }: { election: Election }) {
    // In a real app, this would come from a Stacks API
  const currentBlock = election.startBlock + 10;
  const status = getStatus(election, currentBlock);

  const statusColors = {
    Upcoming: 'bg-blue-500',
    Active: 'bg-green-500',
    Ended: 'bg-gray-500',
  };

  return (
    <Link href={`/elections/${election.id}`}>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
            <CardTitle>{election.title}</CardTitle>
            <Badge className={`${statusColors[status]}`}>
                {status}
            </Badge>
            </div>
            <CardDescription>Created by {election.creator}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground line-clamp-2">{election.description}</p>
        </CardContent>
        <CardFooter>
            <p className="text-sm text-muted-foreground">
            Blocks: {election.startBlock} - {election.endBlock}
            </p>
        </CardFooter>
        </Card>
    </Link>
  );
}

export function ElectionList() {
  if (elections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No elections found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {elections.map((election) => (
        <ElectionCard key={election.id} election={election} />
      ))}
    </div>
  );
}
