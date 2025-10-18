// src/components/PassengerModal.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Traveler } from "../interfaces/Booking";
import Button from "./common/Button";
import Accordion from "./common/Accordion";
import { countries } from "../data/countries";

interface Props {
  passenger: Traveler;
  onSave: (traveler: Traveler) => void;
  onClose: () => void;
}

export default function PassengerModal({ passenger, onSave, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Traveler>({
    defaultValues: passenger,
    mode: "onBlur",
  });

  const [openSection, setOpenSection] = useState<
    "personal" | "contact" | "passport"
  >("personal");

  const toggleSection = (section: "personal" | "contact" | "passport") => {
    setOpenSection((prev) => (prev === section ? section : section));
  };

  const onSubmit = (data: Traveler) => {
    onSave(data);
  };

  const errorText = (message?: string) => (
    <p className="text-sm text-red-500">{message}</p>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center md:justify-end z-50 overflow-y-auto transition-opacity duration-300">
      <div
        className="bg-[var(--color-bg-solid)] w-full md:w-120 lg:w-150 max-h-9/10 md:h-full md:max-h-full overflow-y-auto p-6 rounded-t-2xl md:rounded-l-2xl shadow-lg transform transition-transform duration-300 ease-out translate-y-0 md:translate-x-0"
        onClick={(e) => e.stopPropagation()} // prevent close on content click
      >
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-5 text-center">
          Passenger Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* PERSONAL DETAILS */}
          <Accordion
            title="Personal Details"
            isOpen={openSection === "personal"}
            onToggle={() => toggleSection("personal")}
          >
            <div className="grid gap-3">
              {/* First Name */}
              <Controller
                name="name.firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      First Name
                    </label>
                    <input
                      {...field}
                      placeholder="First Name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.name?.firstName?.message)}
                  </div>
                )}
              />

              {/* Last Name */}
              <Controller
                name="name.lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Last Name
                    </label>
                    <input
                      {...field}
                      placeholder="Last Name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.name?.lastName?.message)}
                  </div>
                )}
              />

              {/* DOB */}
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Date of Birth
                    </label>
                    <input
                      {...field}
                      type="date"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.dateOfBirth?.message)}
                  </div>
                )}
              />

              {/* Gender */}
              <div className="flex gap-6">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="FEMALE"
                          checked={field.value === "FEMALE"}
                          onChange={() => field.onChange("FEMALE")}
                        />
                        Female
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="MALE"
                          checked={field.value === "MALE"}
                          onChange={() => field.onChange("MALE")}
                        />
                        Male
                      </label>
                    </>
                  )}
                />
              </div>
            </div>
          </Accordion>

          {/* CONTACT DETAILS */}
          <Accordion
            title="Contact Details"
            isOpen={openSection === "contact"}
            onToggle={() => toggleSection("contact")}
          >
            <div className="grid gap-3">
              <Controller
                name="contact.emailAddress"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Email Address
                    </label>
                    <input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.contact?.emailAddress?.message)}
                  </div>
                )}
              />

              <Controller
                name="contact.phones.0.number"
                control={control}
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 6,
                    message: "Phone number too short",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Phone Number
                    </label>
                    <input
                      {...field}
                      placeholder="Phone Number"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.contact?.phones?.[0]?.number?.message)}
                  </div>
                )}
              />
            </div>
          </Accordion>

          {/* PASSPORT DETAILS */}
          <Accordion
            title="Passport Details"
            isOpen={openSection === "passport"}
            onToggle={() => toggleSection("passport")}
          >
            <div className="grid gap-3">
              <Controller
                name="documents.0.number"
                control={control}
                rules={{ required: "Passport number is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Passport Number
                    </label>
                    <input
                      {...field}
                      placeholder="Passport Number"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.documents?.[0]?.number?.message)}
                  </div>
                )}
              />

              <Controller
                name="documents.0.issuanceCountry"
                control={control}
                rules={{
                  required: "Issuance country is required",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "Invalid country code format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Issuance Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...field}
                      className="mt-1 border p-2 rounded-lg w-full bg-[var(--color-bg-solid)]"
                    >
                      <option value="">---</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errorText(errors.documents?.[0]?.issuanceCountry?.message)}
                  </div>
                )}
              />

              <Controller
                name="documents.0.issuanceLocation"
                control={control}
                rules={{
                  required: "Issuance location is required",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "Invalid country code format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Issuance Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...field}
                      className="mt-1 border p-2 rounded-lg w-full bg-[var(--color-bg-solid)]"
                    >
                      <option value="">---</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errorText(
                      errors.documents?.[0]?.issuanceLocation?.message
                    )}
                  </div>
                )}
              />

              <Controller
                name="documents.0.nationality"
                control={control}
                rules={{
                  required: "Nationality is required",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "Invalid country code format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...field}
                      className="mt-1 border p-2 rounded-lg w-full bg-[var(--color-bg-solid)]"
                    >
                      <option value="">---</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errorText(errors.documents?.[0]?.nationality?.message)}
                  </div>
                )}
              />

              <Controller
                name="documents.0.validityCountry"
                control={control}
                rules={{
                  required: "Validity country is required",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "Invalid country code format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Validity Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...field}
                      className="mt-1 border p-2 rounded-lg w-full bg-[var(--color-bg-solid)]"
                    >
                      <option value="">---</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errorText(errors.documents?.[0]?.validityCountry?.message)}
                  </div>
                )}
              />

              <Controller
                name="documents.0.issuanceDate"
                control={control}
                rules={{ required: "Issuance date is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Date of Issue
                    </label>
                    <input
                      {...field}
                      type="date"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.documents?.[0]?.issuanceDate?.message)}
                  </div>
                )}
              />

              <Controller
                name="documents.0.expiryDate"
                control={control}
                rules={{ required: "Expiry date is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Expiry Date
                    </label>
                    <input
                      {...field}
                      type="date"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.documents?.[0]?.expiryDate?.message)}
                  </div>
                )}
              />
            </div>
          </Accordion>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              label="Cancel"
              onClick={onClose}
              className="bg-gray-100 text-black hover:bg-gray-200"
            />
            <Button
              type="submit"
              label="Save"
              className="bg-[var(--color-accent)] text-[var(--color-text-primary)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
