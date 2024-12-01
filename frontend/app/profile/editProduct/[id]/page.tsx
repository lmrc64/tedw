"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { showToast } from "@/components/interfaces/ToastNotification";
import { ToastContainer } from "react-toastify";

export default function CustomersPage() {
  interface FormData {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    status: string;
    category: string;
    user: string;
  }

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = (Data: FormData) => {
    const { name, description, image, price, stock, status, category } = Data;
    if (!name || name.length < 3)
      return "Product name must be at least 3 characters long.";
    if (!description || description.length < 10)
      return "Product description must be at least 10 characters long.";
    if (price <= 0 || isNaN(price)) return "The price must be greater than 0.";
    if (stock <= 0 || isNaN(stock)) return "Stock cannot be negative.";
    if (!category) return "Please select a category.";
    if (!status || !["New", "Used"].includes(status))
      return "Please select a valid product status (New or Used).";
    if (!image) return "Product image is required.";
    return null;
  };

  const handleSubmit = async (formData: any) => {
    const validationError = validateForm(formData);
    if (validationError) {
      console.log("Form data received in LoginPage:", formData);
      setError(validationError);
      showToast(validationError, "warn");
      sessionStorage.setItem("errorCreateForm", "true");
      return;
    }
    try {
      // Reiniciar mensajes
      setError(null);
      setSuccess(null);
      console.log(formData);
      const response = await fetch(process.env.API_ROUTE + "/products", {
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
      showToast("Product created successfully!", "success");
      sessionStorage.setItem("errorCreateForm", "false");
    } catch (err: any) {
      var error = err.message || "An unknown error occurred.";
      showToast(error, "error");
    }
  };



  return (
    <Card>
      <ToastContainer pauseOnFocusLoss={false} />
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
