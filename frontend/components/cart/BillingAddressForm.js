import React from "react";

function BillingAddressForm({ billingAddress, handleBillingChange }) {
  const fields = [
    { label: "Street", name: "street", value: billingAddress.street },
    { label: "City", name: "city", value: billingAddress.city },
    { label: "State", name: "state", value: billingAddress.state },
    { label: "Zip Code", name: "zipCode", value: billingAddress.zipCode },
    { label: "Name", name: "name", value: billingAddress.name },
    { label: "Phone", name: "phone", value: billingAddress.phone },
    { label: "Mail", name: "mail", value: billingAddress.mail },
    { label: "Company", name: "company", value: billingAddress.company },
  ];

  return (
    <div className="grid gap-4 mb-4 grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className="mb-4 col-span-2 sm:col-span-1">
          <label
            htmlFor={`billing-${field.name}`}
            className="block text-sm font-medium text-purple-500"
          >
            {field.label}
          </label>
          <input
            type="text"
            id={`billing-${field.name}`}
            name={field.name}
            value={field.value}
            onChange={handleBillingChange}
            className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        </div>
      ))}
    </div>
  );
}

export default BillingAddressForm;
