// src/components/flight/BillingModal.tsx
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "../common/Button";
import Accordion from "../common/Accordion";
import type { Billing } from "../../interfaces/Booking";
import { useState } from "react";
import { countries } from "../../data/countries";

interface Props {
  billing: Billing;
  onSave: (_billing: Billing) => void;
  onClose: () => void;
}

export default function BillingModal({ billing, onSave, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Billing>({
    defaultValues: billing,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "phones" });

  const [openSection, setOpenSection] = useState<
    "personal" | "contact" | "address"
  >("personal");

  const toggleSection = (section: "personal" | "contact" | "address") => {
    setOpenSection((prev) => (prev === section ? section : section));
  };

  const onSubmit = (data: Billing) => onSave(data);

  const errorText = (msg?: string) => (
    <p className="text-sm text-red-500">{msg}</p>
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center md:justify-end z-50">
      <div
        className="bg-[var(--color-bg-solid)] w-full md:w-120 lg:w-150 max-h-9/10 md:h-full md:max-h-full overflow-y-auto p-6 rounded-t-2xl md:rounded-l-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-5 text-center">
          Billing Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Contact Person */}
          <Accordion
            title="Contact Person"
            isOpen={openSection === "personal"}
            onToggle={() => toggleSection("personal")}
          >
            <div className="grid gap-3">
              <Controller
                name="addresseeName.firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...field}
                      placeholder="Enter first name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.addresseeName?.firstName?.message)}
                  </div>
                )}
              />

              <Controller
                name="addresseeName.middleName"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Middle Name(s)
                    </label>
                    <input
                      {...field}
                      placeholder="Enter middle name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.addresseeName?.firstName?.message)}
                  </div>
                )}
              />

              <Controller
                name="addresseeName.lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...field}
                      placeholder="Enter last name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.addresseeName?.lastName?.message)}
                  </div>
                )}
              />

              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Company Name
                    </label>
                    <input
                      {...field}
                      placeholder="Enter company name"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                  </div>
                )}
              />
            </div>
          </Accordion>

          {/* Contact Info */}
          <Accordion
            title="Contact Info"
            isOpen={openSection === "contact"}
            onToggle={() => toggleSection("contact")}
          >
            <div className="grid gap-3">
              {/* Email Address */}
              <Controller
                name="emailAddress"
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
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...field}
                      type="email"
                      placeholder="example@gmail.com"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.emailAddress?.message)}
                  </div>
                )}
              />

              {/* Purpose Field */}
              <Controller
                name="purpose"
                control={control}
                rules={{ required: "Purpose is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...field}
                      className="mt-1 border p-2 rounded-lg w-full bg-[var(--color-bg-solid)]"
                    >
                      <option value="">---</option>
                      <option value="STANDARD">STANDARD</option>
                      <option value="INVOICE">INVOICE</option>
                      <option value="STANDARD_WITHOUT_TRANSMISSION">
                        STANDARD_WITHOUT_TRANSMISSION
                      </option>
                    </select>
                    {errorText(errors.purpose?.message)}
                  </div>
                )}
              />

              {/* Dynamic Phone Numbers */}
              <div>
                <label className="text-sm text-[var(--color-text-secondary)]">
                  Phone Numbers <span className="text-red-500">*</span>
                </label>

                {fields.map((field, index) => (
                  <>
                    <div
                      key={field.id}
                      className="flex items-center mt-2 gap-2"
                    >
                      <Controller
                        name={`phones.${index}.number`}
                        control={control}
                        rules={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{1,15}$/,
                            message:
                              "Phone number must contain 1–15 digits only",
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]{1,15}"
                            placeholder="e.g. 777345167"
                            className="border p-2 rounded-lg flex-1"
                          />
                        )}
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 text-xl font-bold hover:text-red-700"
                        >
                          −
                        </button>
                      )}
                      {fields.length < 3 && (
                        <button
                          type="button"
                          onClick={() =>
                            append({
                              deviceType: "LANDLINE",
                              countryCallingCode: "263",
                              number: "",
                            })
                          }
                          className="text-green-500 text-xl font-bold hover:text-green-700"
                        >
                          +
                        </button>
                      )}
                    </div>
                    {errorText(errors.phones?.[index]?.number?.message)}
                  </>
                ))}
              </div>
            </div>
          </Accordion>

          {/* Address */}
          <Accordion
            title="Address"
            isOpen={openSection === "address"}
            onToggle={() => toggleSection("address")}
          >
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="address.lines.0"
                  control={control}
                  rules={{ required: "Street address is required" }}
                  render={({ field }) => (
                    <div>
                      <label className="text-sm text-[var(--color-text-secondary)]">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...field}
                        placeholder="Street address"
                        className="mt-1 border p-2 rounded-lg w-full"
                        maxLength={35}
                      />
                      {errorText(errors.address?.lines?.[0]?.message)}
                    </div>
                  )}
                />
                <Controller
                  name="address.lines.1"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label className="text-sm text-[var(--color-text-secondary)]">
                        Address Line 2
                      </label>
                      <input
                        {...field}
                        placeholder="Apt, suite, bldg, etc."
                        className="mt-1 border p-2 rounded-lg w-full"
                        maxLength={35}
                      />
                      {errorText(errors.address?.lines?.[1]?.message)}
                    </div>
                  )}
                />
              </div>

              <Controller
                name="address.cityName"
                control={control}
                rules={{ required: "City name is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...field}
                      placeholder="Harare"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.address?.cityName?.message)}
                  </div>
                )}
              />

              <Controller
                name="address.postalCode"
                control={control}
                rules={{ required: "Postal code is required" }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...field}
                      placeholder="00000"
                      className="mt-1 border p-2 rounded-lg w-full"
                    />
                    {errorText(errors.address?.postalCode?.message)}
                  </div>
                )}
              />

              <Controller
                name="address.countryCode"
                control={control}
                rules={{
                  required: "Country code is required",
                  pattern: {
                    value: /^[A-Z]{2}$/,
                    message: "Invalid country code format",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <label className="text-sm text-[var(--color-text-secondary)]">
                      Country Code <span className="text-red-500">*</span>
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
                    {errorText(errors.address?.countryCode?.message)}
                  </div>
                )}
              />
            </div>
          </Accordion>

          {/* Actions */}
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
