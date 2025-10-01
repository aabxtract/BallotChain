'use server';

/**
 * @fileOverview Candidate information validation flow.
 *
 * This file defines a Genkit flow to validate candidate information using AI. It checks if the provided candidate's name,
 * biography, and other attributes match known information, ensuring the accuracy and reliability of candidate data.
 *
 * - `validateCandidateInformation`: Function to validate candidate information.
 * - `ValidateCandidateInformationInput`: Input type for the `validateCandidateInformation` function.
 * - `ValidateCandidateInformationOutput`: Output type for the `validateCandidateInformation` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateCandidateInformationInputSchema = z.object({
  candidateName: z
    .string()
    .describe('The name of the candidate to validate.'),
  biography: z
    .string()
    .describe('A brief biography of the candidate.'),
  otherAttributes: z
    .string()
    .optional()
    .describe('Any other relevant attributes of the candidate.'),
});
export type ValidateCandidateInformationInput = z.infer<
  typeof ValidateCandidateInformationInputSchema
>;

const ValidateCandidateInformationOutputSchema = z.object({
  isValidCandidate: z
    .boolean()
    .describe('Whether the candidate information is valid and matches known information.'),
  confidenceScore: z
    .number()
    .describe(
      'A confidence score (0-1) indicating the reliability of the validation.'
    ),
  validationDetails: z
    .string()
    .describe('Details about the validation process and any discrepancies found.'),
});
export type ValidateCandidateInformationOutput = z.infer<
  typeof ValidateCandidateInformationOutputSchema
>;

export async function validateCandidateInformation(
  input: ValidateCandidateInformationInput
): Promise<ValidateCandidateInformationOutput> {
  return validateCandidateInformationFlow(input);
}

const validateCandidateInformationPrompt = ai.definePrompt({
  name: 'validateCandidateInformationPrompt',
  input: {schema: ValidateCandidateInformationInputSchema},
  output: {schema: ValidateCandidateInformationOutputSchema},
  prompt: `You are an AI assistant specialized in validating candidate information for elections.

  Based on the provided candidate name, biography, and other attributes, determine if the information is accurate and matches known information about the candidate.

  Respond with a confidence score (0-1) indicating the reliability of the validation and provide details about the validation process and any discrepancies found.

  Candidate Name: {{{candidateName}}}
  Biography: {{{biography}}}
  Other Attributes: {{{otherAttributes}}}

  Consider:
  - Does the biography align with known facts about the candidate?
  - Are the other attributes consistent with the candidate's profile?
  - Is there any conflicting information that suggests the candidate data is invalid?

  Output a JSON object in the following format:
  {
    "isValidCandidate": boolean, // true if the candidate information is valid, false otherwise
    "confidenceScore": number, // A score between 0 and 1 indicating the confidence in the validation
    "validationDetails": string // Details about the validation and any discrepancies found
  }`,
});

const validateCandidateInformationFlow = ai.defineFlow(
  {
    name: 'validateCandidateInformationFlow',
    inputSchema: ValidateCandidateInformationInputSchema,
    outputSchema: ValidateCandidateInformationOutputSchema,
  },
  async input => {
    const {output} = await validateCandidateInformationPrompt(input);
    return output!;
  }
);
