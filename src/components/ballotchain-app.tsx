'use client';

import { useState } from 'react';
import type { Election, Candidate, NewCandidate } from '@/lib/types';
import { Header } from '@/components/header';
import { ElectionList } from '@/components/election-list';
import { ElectionDetails } from '@/components/election-details';
import { CreateElectionDialog } from '@/components/create-election-dialog';
import { ValidationResultDialog } from '@/components/validation-result-dialog';
import { validateCandidateInformation } from '@/ai/flows/validate-candidate-information';
import type { ValidateCandidateInformationOutput } from '@/ai/flows/validate-candidate-information';
import { useToast } from '@/hooks/use-toast';

const initialElections: Election[] = [
  {
    id: 'election-1',
    name: '2024 Presidential Election',
    candidates: [],
    isStarted: false,
  },
   {
    id: 'election-2',
    name: 'City Council General',
    candidates: [],
    isStarted: true,
  },
];

export function BallotChainApp() {
  const [elections, setElections] = useState<Election[]>(initialElections);
  const [selectedElectionId, setSelectedElectionId] = useState<string | null>(initialElections[0]?.id || null);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isValidationLoading, setValidationLoading] = useState(false);
  const [validationData, setValidationData] = useState<{ candidate: NewCandidate; result: ValidateCandidateInformationOutput } | null>(null);

  const { toast } = useToast();

  const handleCreateElection = (electionName: string) => {
    const newElection: Election = {
      id: `election-${Date.now()}`,
      name: electionName,
      candidates: [],
      isStarted: false,
    };
    setElections((prev) => [...prev, newElection]);
    setSelectedElectionId(newElection.id);
  };

  const handleStartElection = (id: string) => {
    setElections((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isStarted: true } : e))
    );
  };

  const handleAddCandidate = async (newCandidate: NewCandidate) => {
    if (!selectedElectionId) return;

    setValidationLoading(true);
    try {
      const result = await validateCandidateInformation({
        candidateName: newCandidate.name,
        biography: newCandidate.biography,
      });
      setValidationData({ candidate: newCandidate, result });
    } catch (error) {
      console.error('Validation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Could not validate candidate information. Please try again.',
      });
    } finally {
      setValidationLoading(false);
    }
  };

  const confirmAddCandidate = () => {
    if (!validationData || !selectedElectionId) return;

    const newCandidateEntry: Candidate = {
      id: `candidate-${Date.now()}`,
      ...validationData.candidate,
      validationResult: validationData.result,
    };

    setElections((prev) =>
      prev.map((e) =>
        e.id === selectedElectionId
          ? { ...e, candidates: [...e.candidates, newCandidateEntry] }
          : e
      )
    );
    
    toast({
        title: "Candidate Added",
        description: `${newCandidateEntry.name} has been added to the election.`,
    })

    setValidationData(null);
  };

  const selectedElection = elections.find((e) => e.id === selectedElectionId) || null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1 grid md:grid-cols-[280px_1fr] overflow-hidden">
        <ElectionList
          elections={elections}
          selectedElectionId={selectedElectionId}
          onSelectElection={setSelectedElectionId}
          onCreateElection={() => setCreateDialogOpen(true)}
        />
        <ElectionDetails
          election={selectedElection}
          onAddCandidate={handleAddCandidate}
          onStartElection={handleStartElection}
          isValidationLoading={isValidationLoading}
        />
      </div>
      <CreateElectionDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateElection}
      />
      <ValidationResultDialog
        isOpen={!!validationData}
        onOpenChange={(isOpen) => !isOpen && setValidationData(null)}
        onConfirm={confirmAddCandidate}
        validationData={validationData}
      />
    </div>
  );
}
