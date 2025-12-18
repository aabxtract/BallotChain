import { CreateElectionForm } from '@/components/create-election-form';

export default function CreateElectionPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Election</h1>
      <CreateElectionForm />
    </div>
  );
}
