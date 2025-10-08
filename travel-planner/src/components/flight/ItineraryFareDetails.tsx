import type { TravelerPricing } from "../../interfaces/ConfirmedFlightOffer";

interface Props {
  travelerPricings: TravelerPricing[];
}

function ItineraryFareDetails({ travelerPricings }: Props) {
  return (
    <div>
      <h2 className="font-bold mb-8">Fare Details</h2>
      {travelerPricings.map((traveler) => (
        <div
          key={traveler.travelerId}
          className="bg-white/10 border border-[var(--color-border)] rounded-2xl p-4 mb-8 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2 mb-3">
            <span className="font-medium">
              {traveler.travelerType} – {traveler.fareOption}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              Total: {traveler.price.currency} {traveler.price.total}
            </span>
          </div>

          {/* Cabin Details */}
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1">
              Cabin & Baggage
            </h3>
            <ul className="text-sm space-y-1">
              {traveler.fareDetailsBySegment.map((seg, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    Segment {seg.segmentId} — {seg.cabin} ({seg.class})
                  </span>
                  <span>
                    🧳 {seg.includedCheckedBags.quantity} bag
                    {seg.includedCheckedBags.quantity > 1 ? "s" : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fare Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1">
              Price Breakdown
            </h3>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span>Base Fare</span>
                <span>
                  {traveler.price.currency} {traveler.price.base}
                </span>
              </li>
              {traveler.price.taxes.map((tax, idx) => (
                <li
                  key={idx}
                  className="flex justify-between text-[var(--color-text-muted)]"
                >
                  <span>Tax ({tax.code})</span>
                  <span>
                    {traveler.price.currency} {tax.amount}
                  </span>
                </li>
              ))}
              <li className="flex justify-between font-semibold border-t border-[var(--color-border)] pt-1 mt-1">
                <span>Total</span>
                <span>
                  {traveler.price.currency} {traveler.price.total}
                </span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItineraryFareDetails;
