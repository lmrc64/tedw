"use client";

import React, { useState } from "react";
import CountrySelect from "@/components/interfaces/countryList";

type SignUpFormProps = {
  onSubmit: (formData: any) => void;
  error: string | null;
  success: string | null;
};

export default function SignUpForm({
  onSubmit,
  error,
  success,
}: SignUpFormProps) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    terms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderInput = (
    label: string,
    id: string,
    type: string,
    value: string,
    placeholder: string = ""
  ) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-purple-500">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
        required
      />
    </div>
  );

  return (
    <section className="bg-white px-4 py-6   rounded-md font-primary font-extrabold">
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {renderInput("Firstname", "firstname", "text", formData.firstname)}
      {renderInput("Lastname", "lastname", "text", formData.lastname)}
      <div className="mb-4">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-purple-500"
        >
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {renderInput(
        "Your email",
        "email",
        "email",
        formData.email,
        "name@company.com"
      )}
      {renderInput(
        "Password",
        "password",
        "password",
        formData.password,
        "••••••••"
      )}
      <div className="mb-4">
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-purple-500"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirm-password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-purple-600 block w-full p-2.5 "
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required={true}
        />
      </div>
      
      <CountrySelect
        onChange={(country) => setFormData((prev) => ({ ...prev, country }))}
        value={formData.country}
      />

      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-500"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        <label
          htmlFor="terms"
          className="ml-3 text-sm font-light text-purple-500"
        >
          I accept the{" "}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Terms and Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create an account
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
    </section>
  );
}
