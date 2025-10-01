import type { Candidate } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const confidenceScore = candidate.validationResult.confidenceScore * 100;

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription className="line-clamp-3">{candidate.biography}</CardDescription>
      </CardHeader>
      <CardContent>
        {candidate.validationResult.isValidCandidate ? (
          <Badge variant="secondary" className="text-green-600 border-green-200">
            Verified Candidate
          </Badge>
        ) : (
          <Badge variant="destructive">Verification Failed</Badge>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2">
         <div className="w-full">
            <div className="flex justify-between mb-1 text-xs text-muted-foreground">
                <span>AI Confidence</span>
                <span>{confidenceScore.toFixed(0)}%</span>
            </div>
            <Progress value={confidenceScore} className="h-2" />
         </div>
      </CardFooter>
    </Card>
  );
}
