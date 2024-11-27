"use client";

import React, { useState } from "react";
import CountrySelect from "./countryList";

type SignUpFormProps = {
  onSubmit: (formData: any) => void;
  error: string | null;
  success: string | null;
};

export default function SignUpForm({ onSubmit, error, success }: SignUpFormProps) {
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
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); 
  };
  

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-purple-500"
        >
          Firstname
        </label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-4">
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-purple-500"
        >
          Lastname
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>

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
          className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">
            Select your gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-purple-500 "
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          required={true}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-purple-500"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
          value={formData.password}
          onChange={handleChange}
          required={true}
        />
      </div>
      
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
          className="bg-gray-50 border border-gray-300 text-purple-500 text-sm rounded-lg focus:ring-primary-600 focus:border-purple-600 block w-full p-2.5 "
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required={true}
        />
      </div>

      <CountrySelect
        onChange={(country) => setFormData({ ...formData, country })}
        value={formData.country}
      />

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-500"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-light text-purple-500">
            I accept the{" "}
            <a className="font-medium text-purple-600 hover:underline" href="#">
              Terms and Conditions
            </a>
          </label>
        </div>
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
  );
}
