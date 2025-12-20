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
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import type { Election } from '@/lib/elections';
import { useStacks } from '@/hooks/use-stacks';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

function getStatus(election: Election, currentBlock: number): 'Upcoming' | 'Active' | 'Ended' {
  if (currentBlock < election.startBlock) return 'Upcoming';
  if (currentBlock >= election.startBlock && currentBlock <= election.endBlock) return 'Active';
  return 'Ended';
}

export function ElectionDetail({ election }: { election: Election }) {
  // In a real app, this would come from a Stacks API
  const currentBlock = election.startBlock + 10;
  const status = getStatus(election, currentBlock);
  const { isConnected, user } = useStacks();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userHasToken, setUserHasToken] = useState(false); // Assume user doesn't have the token initially
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would check the user's wallet for the required token
    // For now, we'll simulate this.
    if (election.tokenContractAddress && isConnected && user) {
      // Mock check: e.g., allow voting if the user's address is a specific one
      if (user.stxAddress.mainnet.startsWith('SP2J')) {
        setUserHasToken(false); //This user does not have the token
      } else {
        setUserHasToken(true); // Other users are assumed to have it for demo
      }
    } else {
      // If no token is required, everyone is eligible
      setUserHasToken(true);
    }
  }, [isConnected, user, election.tokenContractAddress]);

  const totalVotes = election.candidates.reduce((sum, c) => sum + c.votes, 0);

  const handleVote = () => {
    if (!isConnected) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to vote.',
      });
      return;
    }
    if (election.tokenContractAddress && !userHasToken) {
      toast({
        variant: 'destructive',
        title: 'Token Required',
        description: 'You do not hold the required token to vote in this election.',
      });
      return;
    }
    if (!selectedCandidate) {
      toast({
        variant: 'destructive',
        title: 'No candidate selected',
        description: 'Please select a candidate to vote for.',
      });
      return;
    }
    // TODO: Implement actual voting transaction
    console.log(`Voting for candidate ${selectedCandidate}`);
    setHasVoted(true);
    toast({
      title: 'Vote Submitted',
      description: `Your vote for Candidate ${selectedCandidate} has been cast.`,
    });
  };

  const statusColors = {
    Upcoming: 'bg-blue-500',
    Active: 'bg-green-500',
    Ended: 'bg-gray-500',
  };

  const canVote = status === 'Active' && !hasVoted && userHasToken;
  const cannotVoteMessage = () => {
    if (status !== 'Active') return 'Voting is not active for this election.';
    if (hasVoted) return 'You have already voted in this election.';
    if (election.tokenContractAddress && !userHasToken) return 'You do not hold the required token to vote.';
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl flex items-center gap-2">
                {election.title}
                {election.tokenContractAddress && <Lock className="w-6 h-6 text-muted-foreground" title="Token-gated election" />}
              </CardTitle>
              <CardDescription className="mt-2">
                Created by {election.creator}
              </CardDescription>
            </div>
            <Badge className={`${statusColors[status]}`}>
              {status}
            </Badge>
          </div>
          <p className="pt-4">{election.description}</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {status === 'Ended' ? 'Final Results' : 'Current Standings'}
            </h3>
            <div className="space-y-4">
              {election.candidates.map((candidate) => (
                <div key={candidate.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{candidate.name || `Candidate ${candidate.id}`}</span>
                    <span className="text-muted-foreground">
                      {candidate.votes} Votes ({totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <Progress value={totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0} />
                </div>
              ))}
            </div>
          </div>

          {status === 'Active' && !hasVoted && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Cast Your Vote</h3>
              {cannotVoteMessage() ? (
                <p className='text-center text-yellow-600 font-semibold bg-yellow-100 p-3 rounded-md'>{cannotVoteMessage()}</p>
              ) : (
                <RadioGroup
                  onValueChange={setSelectedCandidate}
                  defaultValue={selectedCandidate ?? undefined}
                  className="space-y-2"
                >
                  {election.candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={candidate.id.toString()} id={`candidate-${candidate.id}`} />
                      <Label htmlFor={`candidate-${candidate.id}`} className="cursor-pointer">
                        Vote for {candidate.name || `Candidate ${candidate.id}`}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}
           {hasVoted && (
             <p className='text-center text-green-600 font-semibold bg-green-100 p-3 rounded-md'>You have successfully voted in this election.</p>
           )}
        </CardContent>
        {status === 'Active' && !hasVoted && canVote && (
          <CardFooter>
            <Button onClick={handleVote} disabled={!isConnected || !selectedCandidate}>
              Submit Vote
            </Button>
          </CardFooter>
        )}
      </Card>
      <div className="mt-4 text-center text-muted-foreground">
        <p>
          Voting Period: Block {election.startBlock} to Block {election.endBlock}
        </p>
        {status === 'Active' && (
          <p>Blocks remaining: {election.endBlock - currentBlock}</p>
        )}
        {election.tokenContractAddress && (
          <p className="text-sm mt-1">
            Requires token: <code className="text-xs bg-muted p-1 rounded">{election.tokenContractAddress}</code>
          </p>
        )}
      </div>
    </div>
  );
}
