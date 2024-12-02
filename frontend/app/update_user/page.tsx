"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import UpdateUserForm from "./UpdateUserForm";
import { showToast } from "@/components/interfaces/ToastNotification";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';


export default function LoginPage() {
  interface FormData {
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    terms: boolean;
  }

  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    terms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user data from the endpoint
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(process.env.API_ROUTE + "/users/"+sessionStorage.getItem('id'), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust if needed
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setFormData({
          firstname: userData.firstname || "",
          lastname: userData.lastname || "",
          gender: userData.gender || "",
          email: userData.email || "",
          password: "", // Keep empty for security reasons
          confirmPassword: "",
          phone: userData.phone || "",
          country: userData.country || "",
          state: userData.state || "",
          city: userData.city || "",
          zip: userData.zip || "",
          terms: userData.terms || false,
        });
      } catch (err: any) {
        console.error(err.message);
        setError("Error loading user data.");
        showToast(err.message, "error");
      }
    };

    fetchUserData();
  }, []);

  const validateForm = (Data: FormData) => {
    const { password, confirmPassword, terms } = Data;
    if (password !== confirmPassword) return "Passwords don´t match.";
    if (password.length < 8 && password !== "")
      return "The password must be at least 8 characters";
    if (!terms) return "You must accept the terms and conditions";
    return null;
  };

  const handleSubmit = async (updatedData: FormData) => {
    setError(null);
    setSuccess(null);

    const validationError = validateForm(updatedData);
    if (validationError) {
      setError(validationError);
      showToast(validationError, "warn");
      return;
    }
    try {
      const response = await fetch(process.env.API_ROUTE + "/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }
      setSuccess("User updated successfully!");
      showToast("User updated successfully!", "success");
    } catch (err: any) {
      setError(err.message);
      showToast(err.message, "warn");
    }
  };

  return (

      <div>
        <ToastContainer pauseOnFocusLoss={false} />
        <Nav />
        <div className="font-primary font-extrabold bg-gray-50 min-h-screen flex justify-center items-center md:items-center p-8">
          <Card className="bg-gray-50 w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex justify-center">
                Update your profile
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <UpdateUserForm
                  onSubmit={handleSubmit}//temporal for dev
                  error={error}
                  success={success}
                  initialData={formData} // Pass initial data here
              />
            </CardFooter>
          </Card>
        </div>
      </div>
  );
}
