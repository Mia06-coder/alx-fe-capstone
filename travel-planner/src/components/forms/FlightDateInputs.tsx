import { useEffect, useState } from "react";
import Input from "./Input";
import { FaMinus } from "react-icons/fa";

interface FlightDateInputsProps {
  departureDate: string;
  returnDate: string;
  setDepartureDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setHasError: (hasError: boolean) => void;
}

export default function FlightDateInputs({
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
  setHasError,
}: FlightDateInputsProps) {
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  // Keep parent form informed if there 's an error
  useEffect(() => {
    setHasError(Boolean(error));
  }, [error, setHasError]);
  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDeparture = e.target.value;

    if (newDeparture < todayStr) {
      setError("Departure date cannot be in the past.");
      setHasError(true);
      return;
    }

    setDepartureDate(newDeparture);

    if (returnDate && returnDate < newDeparture) {
      setReturnDate("");
      setError("Return date cannot be before departure date.");
      setHasError(true);
    } else {
      setError(null);
      setHasError(false);
    }
  };

  const handleReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReturn = e.target.value;

    if (newReturn && newReturn < departureDate) {
      setError("Return date cannot be before departure date.");
      setHasError(true);
      return;
    }

    setReturnDate(newReturn);
    setError(null);
    setHasError(false);
  };

  return (
    <>
      {/* Check-in and check-out date inputs */}
      <div className="flex items-center gap-2 w-full ">
        <Input
          id="check-in-date"
          label="CHECK-IN DATE"
          name="check-in-date"
          type="date"
          placeholder="Check-in"
          value={departureDate}
          min={todayStr} // disable past dates
          onChange={handleDepartureChange}
          required={true}
        />

        <button type="button">
          <FaMinus size={20} className="text-[var(--color-placeholder)]" />
        </button>

        <Input
          id="check-out-date"
          label="CHECK-OUT DATE"
          name="check-out-date"
          type="date"
          placeholder="Check-out"
          value={returnDate}
          min={departureDate || todayStr} // disable before departure
          disabled={!departureDate} // disable until departure selected
          onChange={handleReturnChange}
          required={false}
        />
      </div>
      {/* Error message */}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </>
  );
}
