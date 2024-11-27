"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import Nav from "./Nav";
import SignUpForm from "./SignUpForm";
import ToastNotification, { showToast } from "./ToastNotification";

export default function LoginPage() {
  interface FormData {
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    terms: boolean;
  }

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = (Data: FormData) => {
    const { password, confirmPassword, terms } = Data;
    console.log("Form data received in LoginPage:", confirmPassword); 

    if (password !== confirmPassword) return "Password do not match.";
    if (password.length < 8)
      return "The password must be at least 8 characters";
    if (!terms) return "You must accept the terms and conditions";
    return null;
  };

  const handleSubmit = async (formData: any) => {
    setError(null);
    setSuccess(null);
    
    const validationError = validateForm(formData);
    if (validationError) {
      console.log("Form data received in LoginPage:", formData); 
      setError(validationError);
      showToast(validationError, "warn");
      return;
    }
    try {
      const response = await fetch("http://localhost:3008/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
      setSuccess("User registered successfully!");
      showToast("User created successfully!", "success");
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, "warn");
    }
  };

  return (
    <div>
      <ToastNotification />
      <Nav />
      <div className="font-primary font-extrabold bg-gray-50 min-h-screen flex justify-center items-center md:items-center p-8">
        <Card className="bg-gray-50 w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardFooter>
            <SignUpForm
              onSubmit={handleSubmit}
              error={error}
              success={success}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
