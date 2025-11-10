// src/pages/MyHoldsPage.tsx
import { useMyHoldsQuery } from "../hooks/useMyHoldsQuery";
import { useCancelHoldMutation } from "../hooks/useCancelHoldMutation";

type Hold = {
  id: string;
  bookTitle: string;
  queuedAt: string;
  status: string;
};

export default function MyHoldsPage() {
  const { data, isLoading, error } = useMyHoldsQuery();
  const cancelHold = useCancelHoldMutation();

  if (isLoading) return <p className="p-4 text-gray-500">Loading your holds...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load your holds.</p>;

  const holds: Hold[] = data ?? [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">My Holds</h1>

      {holds.length === 0 ? (
        <p className="text-gray-600">You have no active holds.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Book</th>
              <th className="text-left py-2">Queued at</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2"></th>
            </tr>
          </thead>
          <tbody>
            {holds.map((hold) => (
              <tr key={hold.id} className="border-b">
                <td className="py-2">{hold.bookTitle}</td>
                <td className="py-2">{hold.queuedAt}</td>
                <td className="py-2">{hold.status}</td>
                <td className="py-2">
                  {hold.status === "ACTIVE" && (
                    <button
                      onClick={() => cancelHold.mutate(hold.id)}
                      className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
