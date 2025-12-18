'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useStacks } from '@/hooks/use-stacks';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { elections } from '@/lib/elections';

const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    candidateCount: z.coerce
      .number()
      .int()
      .gt(1, 'There must be at least 2 candidates'),
    startBlock: z.coerce.number().int().min(1, 'Start block must be a positive number'),
    endBlock: z.coerce.number().int().min(1, 'End block must be a positive number'),
  })
  .refine((data) => data.endBlock > data.startBlock, {
    message: 'End block must be greater than start block',
    path: ['endBlock'],
  });

export function CreateElectionForm() {
  const { toast } = useToast();
  const { isConnected, user } = useStacks();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      candidateCount: 2,
      startBlock: 0,
      endBlock: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isConnected || !user) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to create an election.',
      });
      return;
    }

    console.log(values);
    // TODO: Call smart contract to create election
    
    // Mock creating a new election and redirecting
    const newElectionId = elections.length + 1;
    const newElection = {
      id: newElectionId,
      ...values,
      creator: user.stxAddress.mainnet,
      candidates: Array.from({ length: values.candidateCount }, (_, i) => ({
        id: i + 1,
        votes: 0,
      })),
    };
    
    // In a real app, we'd add this to our state after successful transaction
    // elections.push(newElection);

    toast({
      title: 'Transaction Submitted',
      description: 'Your new election is being created.',
    });
    
    // Redirect to the new admin page
    router.push(`/elections/${newElectionId}/admin`);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Election Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Class President" {...field} />
                  </FormControl>
                  <FormDescription>
                    The official title of the election.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of the election..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="candidateCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Candidates</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startBlock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Block</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The blockchain block number when voting begins.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endBlock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Block</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The blockchain block number when voting ends.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isConnected}>
              Create Election
            </Button>
            {!isConnected && <p className="text-sm text-destructive mt-2">Please connect your wallet to create an election.</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
