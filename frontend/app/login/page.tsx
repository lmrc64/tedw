"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "./Nav";
import { useState, FormEvent } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3008/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        localStorage.clear();
        throw new Error(message || "Something went wrong");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user);
      localStorage.setItem("name", data.name);
      localStorage.setItem("gender", data.gender);

      alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="font-primary font-extrabold bg-gray-50 min-h-screen flex justify-center items-center md:items-center p-8">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">
              Login
            </CardTitle>
          </CardHeader>

          <CardFooter>
            <div>
              <section className="bg-gray-50 font-primary font-extrabold">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                  <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handleSubmit}
                      >
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
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-purple-500 text-purple-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
                            placeholder="name@company.com"
                            required={true}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-purple-500 "
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-purple-500 text-purple-500 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
                            required={true}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <a
                            href="#"
                            className="text-sm font-medium text-purple-500 hover:underline "
                          >
                            Forgot password?
                          </a>
                        </div>
                        {error && (
                          <p className="text-sm text-red-500">{error}</p>
                        )}
                        <button
                          type="submit"
                          className="w-full text-white bg-purple-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Sign in"}
                        </button>
                        <p className="text-sm font-light text-gray-900 ">
                          Don’t have an account yet?{" "}
                          <a
                            href="/signUp"
                            className="font-medium text-purple-500 hover:underline "
                          >
                            Sign up
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
