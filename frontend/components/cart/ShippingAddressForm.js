import React from "react";

function ShippingAddressForm({ shippingAddress, handleShippingChange }) {
  const fields = [
    { label: "Street", name: "street", value: shippingAddress.street },
    { label: "City", name: "city", value: shippingAddress.city },
    { label: "State", name: "state", value: shippingAddress.state },
    { label: "Zip Code", name: "zipCode", value: shippingAddress.zipCode },
  ];

  return (
    <div className="grid gap-4 mb-4 grid-cols-2">
      {fields.map((field) => (
        <div key={field.name} className="mb-4 col-span-2 sm:col-span-1">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-purple-500"
          >
            {field.label}
          </label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={handleShippingChange}
            className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            required
          />
        </div>
      ))}
    </div>
  );
}

export default ShippingAddressForm;
