"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Nav from "./Nav";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import React from "react";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(process.env.API_ROUTE + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.text();
        sessionStorage.clear();
        throw new Error(message || "Something went wrong");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", data.user);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("gender", data.gender);
      sessionStorage.setItem("id", data.id);
      sessionStorage.setItem("role", data.admin);
      router.push("/store");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      toast.error("🦄 " + err.message || "An unknown error occurred", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <ToastContainer />

      <div className="font-primary font-extrabold bg-gray-50 min-h-screen flex justify-center items-center md:items-center p-8">
        <Card className="bg-gray-50 w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">
              Login
            </CardTitle>
          </CardHeader>

          <CardFooter className="text-lg flex justify-center">
            <div className="max-w-2xl w-96">
              <section className="bg-gray-50 font-primary font-extrabold">
                <div className="flex flex-col px-2 py-4 mx-auto lg:py-0">
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
                            className="bg-gray-50 border border-purple-500 text-black rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
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
                            className="bg-gray-50 border border-purple-500 text-black rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 "
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
