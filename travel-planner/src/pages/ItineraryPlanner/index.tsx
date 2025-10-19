import Tabs from "../../components/Tabs";
import { useItinerary } from "../../hooks/useItinerary";

export default function ItineraryPlanner() {
  const { items, removeItem, clearItinerary } = useItinerary();

  return (
    <div className="container mx-auto p-6">
      <Tabs />
      {items.length === 0 ? (
        <p className="flex justify-center items-center min-h-50">
          Your itinerary is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">My Itinerary</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] mt-6">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[var(--color-bg-solid)] text-[var(--color-text-secondary)] uppercase text-xs font-semibold border-b border-[var(--color-border)]">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Name / ID</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-[var(--color-text-muted)]"
                    >
                      Your itinerary is empty.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] transition-colors"
                    >
                      <td className="px-4 py-3 font-medium capitalize">
                        {item.type}
                      </td>
                      <td className="px-4 py-3">
                        {item.data.name || item.data.id}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Clear All Button */}
          {items.length > 0 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={clearItinerary}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
