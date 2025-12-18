import { ElectionDetail } from '@/components/election-detail';
import { elections } from '@/lib/elections';

export default function ElectionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const election = elections.find((e) => e.id.toString() === params.id);

  if (!election) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold">Election not found</h1>
      </div>
    );
  }

  return <ElectionDetail election={election} />;
}
