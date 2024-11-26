"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "./Nav";
import CountrySelect from "./countryList";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [gender, setGender] = useState<string>("");

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

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const { password, confirmPassword, terms } = formData;

    if (password !== confirmPassword) return "Password do not match.";
    if (password.length < 8)
      return "The password must be at least 8 characters";
    if (!terms) return "You must accept the terms and conditions";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await fetch("http://localhost:3008/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const data = await response.json();
      setSuccess("User registered successfully!");
      setError(null);
      console.log(data);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <Nav />
      <div className="font-primary font-extrabold bg-gray-50 min-h-screen flex justify-center items-center md:items-center p-8">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">
              Create an account
            </CardTitle>
          </CardHeader>

          <CardFooter>
            <div>
              <section className="bg-gray-50 font-primary font-extrabold ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                  <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}
                      >
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
                            <option value="" disabled={gender !== ""}>
                              Select your gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
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
                        <CountrySelect
                          onChange={(country) =>
                            setFormData({ ...formData, country })
                          }
                          value={formData.country}
                        />

                        <div>
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
                        <div>
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
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              aria-describedby="terms"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:purple-500 "
                              name="terms"
                              checked={formData.terms}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-light text-purple-500 "
                            >
                              I accept the{" "}
                              <a
                                className="font-medium text-purple-600 hover:underline "
                                href="#"
                              >
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
                        <p className="text-sm font-light text-gray-900 ">
                          Already have an account?{" "}
                          <a
                            href="/login"
                            className="font-medium text-purple-600 hover:underline"
                          >
                            Login here
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
