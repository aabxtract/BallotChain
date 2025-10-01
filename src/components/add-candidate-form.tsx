'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import type { NewCandidate } from '@/lib/types';

const candidateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  biography: z.string().min(10, 'Biography must be at least 10 characters.'),
});

type AddCandidateFormProps = {
  onSubmit: (data: NewCandidate) => Promise<void>;
  isLoading: boolean;
};

export function AddCandidateForm({ onSubmit, isLoading }: AddCandidateFormProps) {
  const form = useForm<z.infer<typeof candidateSchema>>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: '',
      biography: '',
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof candidateSchema>) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Candidate</CardTitle>
        <CardDescription>
          Submit a candidate for validation. Our AI will verify their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="biography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief biography for the candidate..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Validate and Add Candidate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
