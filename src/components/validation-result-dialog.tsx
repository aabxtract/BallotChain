'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { NewCandidate } from '@/lib/types';
import type { ValidateCandidateInformationOutput } from '@/ai/flows/validate-candidate-information';

type ValidationResultDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
  validationData: { candidate: NewCandidate; result: ValidateCandidateInformationOutput } | null;
};

export function ValidationResultDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  validationData,
}: ValidationResultDialogProps) {
  if (!validationData) return null;

  const { candidate, result } = validationData;
  const confidenceScore = result.confidenceScore * 100;
  const isValid = result.isValidCandidate;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isValid ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <XCircle className="text-destructive" />
            )}
            Validation Result for {candidate.name}
          </DialogTitle>
          <DialogDescription>{result.validationDetails}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Status</span>
            {isValid ? (
              <Badge variant="secondary" className="text-green-600 border-green-200">
                Verified
              </Badge>
            ) : (
              <Badge variant="destructive">Failed</Badge>
            )}
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm text-muted-foreground">
              <span>AI Confidence Score</span>
              <span className="font-semibold">{confidenceScore.toFixed(0)}%</span>
            </div>
            <Progress value={confidenceScore} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!isValid}>
            Add Candidate to Election
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
