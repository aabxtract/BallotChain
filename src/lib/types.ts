import type { ValidateCandidateInformationOutput } from '@/ai/flows/validate-candidate-information';

export type Candidate = {
  id: string;
  name: string;
  biography: string;
  validationResult: ValidateCandidateInformationOutput;
};

export type Election = {
  id: string;
  name: string;
  candidates: Candidate[];
  isStarted: boolean;
};

export type NewCandidate = {
  name: string;
  biography: string;
};
