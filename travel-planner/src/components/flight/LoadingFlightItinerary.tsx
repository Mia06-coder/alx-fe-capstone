// src/components/flight/LoadingFlightItinerary.tsx

import loadingIllustration from "../../assets/illustrations/loading-itinerary.svg";

export default function LoadingFlightItinerary() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <img
        src={loadingIllustration}
        alt="Loading itinerary"
        className="max-w-sm w-[80%] mb-6 animate-pulse"
      />
      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
        Confirming flight details for accuracy...
      </h2>
      <p className="text-[var(--color-text-muted)] max-w-md">
        Please wait while we load.
      </p>
    </div>
  );
}
