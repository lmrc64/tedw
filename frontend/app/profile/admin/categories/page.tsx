"use client";
import React, { useState, useEffect } from "react";
import DataTableComponent from "./DataTableComponent";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SquarePlus } from "lucide-react";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/interfaces/ToastNotification";

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]); // Cambiar a categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.API_ROUTE + "/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Category created successfully!", "success");
        setIsModalOpen(false);
        setFormData({
          category: "",
          description: "",
        });
        handleFetchCategoriesWithDelay()
      } else {
        showToast("Failed to create category", "error");
      }
    } catch (error) {
      //console.error("Error:", error);
      showToast("An error occurred while creating the category", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFetchCategoriesWithDelay = () => {
    setTimeout(() => {
      fetchCategories();
    }, 3000);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.API_ROUTE + "/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      const transformedCategories = data.categories.map((category: any) => ({
        id: category._id,
        category: category.category,
        description: category.description,
      }));
      setCategories(transformedCategories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-primary">
      <ToastContainer pauseOnFocusLoss={false} />
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-primary text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2 ml-auto"
            type="button"
          >
            <SquarePlus className="h-5 w-5" />
            Create a new Category
          </button>
        </CardHeader>
        <CardFooter>
          <DataTableComponent categories={categories} fetchCategories={fetchCategories} />
          <br />
          <br />
          <br />
        </CardFooter>
      </Card>
      {/* Modal */}
      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
