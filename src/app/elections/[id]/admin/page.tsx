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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { elections, type Election } from '@/lib/elections';
import { useToast } from '@/hooks/use-toast';
import { useStacks } from '@/hooks/use-stacks';
import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  validateCandidateInformation,
  type ValidateCandidateInformationOutput,
} from '@/ai/flows/validate-candidate-information';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

function getStatus(election: Election, currentBlock: number): 'Upcoming' | 'Active' | 'Ended' {
  if (currentBlock < election.startBlock) return 'Upcoming';
  if (currentBlock >= election.startBlock && currentBlock <= election.endBlock) return 'Active';
  return 'Ended';
}

export default function ElectionAdminPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { isConnected, user } = useStacks();
  const [election, setElection] = useState<Election | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [validationResult, setValidationResult] =
    useState<ValidateCandidateInformationOutput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const foundElection = elections.find((e) => e.id.toString() === id);
    if (!foundElection) {
      // For now, let's create a mock one if not found for dev purposes
      // In a real app, you'd show a 404
      const mockElection = {
        id: parseInt(id),
        title: `Newly Created Election ${id}`,
        description: 'Manage your newly created election.',
        creator: user?.stxAddress.mainnet ?? 'N/A',
        startBlock: 1,
        endBlock: 100,
        candidates: [],
      };
      setElection(mockElection);
    } else {
      setElection(foundElection);
    }
  }, [id, user]);

  if (!election) {
    return notFound();
  }

  const currentBlock = election.startBlock - 1; // Assuming it's upcoming
  const status = getStatus(election, currentBlock);

  const handleAddCandidate = async () => {
    if (!candidateName) {
      toast({
        variant: 'destructive',
        title: 'Candidate name required',
        description: 'Please enter a name for the candidate.',
      });
      return;
    }
    setIsSubmitting(true);
    // TODO: Call AI validation
    try {
      const result = await validateCandidateInformation({ candidateName, biography: '' });
      setValidationResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Validation Failed',
        description: 'Could not validate candidate information.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const confirmAddCandidate = () => {
    // TODO: Implement actual contract call to add candidate
    console.log(`Adding candidate: ${candidateName}`);
    toast({
      title: 'Candidate Submitted',
      description: `${candidateName} is being added to the election.`,
    });
    setCandidateName('');
    setIsDialogOpen(false);
    setValidationResult(null);
  };


  const canManage = status === 'Upcoming' && isConnected && user?.stxAddress.mainnet === election.creator;

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">Manage: {election.title}</CardTitle>
                <CardDescription className="mt-2">
                  Election Admin Board
                </CardDescription>
              </div>
              <Badge>{status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {canManage ? (
              <Card>
                <CardHeader>
                  <CardTitle>Add Candidate</CardTitle>
                  <CardDescription>
                    Add a candidate to the election ballot. The election must be in 'Upcoming' status.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="candidateName">Candidate Name</Label>
                      <Input
                        id="candidateName"
                        type="text"
                        placeholder="e.g., Jane Doe"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <Button onClick={handleAddCandidate} disabled={isSubmitting} className="self-end">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : 'Validate & Add'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground">
                You can only add candidates to an election you created while it is in 'Upcoming' status.
              </p>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Current Candidates</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {election.candidates.length > 0 ? (
                    election.candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>{candidate.id}</TableCell>
                        <TableCell>{candidate.name || `Candidate ${candidate.id}`}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center">
                        No candidates added yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Election starts at block {election.startBlock} and ends at block {election.endBlock}.
            </p>
          </CardFooter>
        </Card>
      </div>
      {validationResult && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Candidate Validation Result</DialogTitle>
              <DialogDescription>
                AI analysis of the candidate information. Review before adding to the ballot.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p>
                <strong>Candidate:</strong> {candidateName}
              </p>
              <p>
                <strong>Is Valid:</strong>{' '}
                <span
                  className={
                    validationResult.isValidCandidate ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {validationResult.isValidCandidate ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <strong>Confidence Score:</strong> {validationResult.confidenceScore.toFixed(2)}
              </p>
              <div>
                <strong>Details:</strong>
                <p className="text-sm text-muted-foreground p-2 border rounded-md bg-muted/50">
                  {validationResult.validationDetails}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmAddCandidate}>
                Confirm & Add Candidate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
