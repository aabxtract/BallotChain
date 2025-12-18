import { ElectionList } from '@/components/election-list';

export default function ElectionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">All Elections</h1>
      <ElectionList />
    </div>
  );
}
