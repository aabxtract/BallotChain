'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type CreateElectionDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (electionName: string) => void;
};

export function CreateElectionDialog({ isOpen, onOpenChange, onSubmit }: CreateElectionDialogProps) {
  const [electionName, setElectionName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (electionName.trim()) {
      onSubmit(electionName.trim());
      setElectionName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Election</DialogTitle>
            <DialogDescription>
              Enter a name for your new election. You can add candidates after creating it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={electionName}
                onChange={(e) => setElectionName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 2024 Presidential Election"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Election</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
