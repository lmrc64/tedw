"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import ProductForm from "./ProductForm";
import { ToastContainer, toast, Flip } from "react-toastify";

export default function CustomersPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      // Reiniciar mensajes
      setError(null);
      setSuccess(null);
      console.log(formData);
      const response = await fetch(process.env.API_ROUTE +"/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product. Please try again.");
      }

      setSuccess("Product created successfully!");
      toast.success('🦄 Product created successfully!!', {
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
    } catch (err: any) {
      toast.error(err.message || "An unknown error occurred." , {
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
    }
  };

  return (
    <Card>
      <ToastContainer
      pauseOnFocusLoss={false}
       />
      <CardHeader>
        <CardTitle>Add Products</CardTitle>
        <CardDescription>Fill the Form to Add a new Product</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm onSubmit={handleSubmit} error={error} success={success} />
      </CardContent>
    </Card>
  );
}
