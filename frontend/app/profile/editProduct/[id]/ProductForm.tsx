"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { showToast } from "@/components/interfaces/ToastNotification";

type ProductFormProps = {
  onSubmit: (formData: any) => void;
  error: string | null;
  success: string | null;
};

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    status: "",
    category: "",
    user: sessionStorage.getItem("id"),
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(process.env.API_ROUTE + "/categories");
        if (!res.ok) throw new Error("Error fetching categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setSelectedImages(Array.from(e.target.files || []));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      showToast("Please first confirm the images!!", "warn");
      return;
    }
    onSubmit(formData);
    if (sessionStorage.getItem("errorCreateForm") != "true"){
      setFormData({ name: "", description: "", image: "", price: "", stock: "", status: "", category: "", user: sessionStorage.getItem("id") });
      setSelectedImages([]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedImages(fileArray); // Almacenar los archivos seleccionados

      // Crear vistas previas
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      previewUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => URL.revokeObjectURL(url); // Liberar memoria después de cargar la vista previa
      });
    }
  };

  // Subir la imagen y obtener la URL
  const uploadImages = async () => {
    if (!selectedImages.length) return alert("Please select images");

    setLoading(true);
    try {
      const uploadedUrls = await Promise.all(selectedImages.map(async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(process.env.API_ROUTE + "/upload_image", formData, { headers: { "Content-Type": "multipart/form-data" } });
        return response.data.url;
      }));
      setUploadedImageUrls(uploadedUrls);
      setFormData((prev) => ({ ...prev, image: uploadedUrls }));
      alert("Images uploaded successfully");
    } catch (error) {
      alert("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 md:space-y-6 mb-4 font-primary"
      onSubmit={handleSubmit}
    >
      {/* Product Name */}
      <div>
        <label
          htmlFor="productname"
          className="block text-sm font-medium text-purple-500"
        >
          Product Name
        </label>
        <input
          type="text"
          id="productname"
          name="name" // Cambiar el nombre a "name"
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Product Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-purple-500"
        >
          Product Description
        </label>
        <textarea
          id="description"
          name="description" // Cambiar el nombre a "description"
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      {/* Product Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-purple-500"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        >
          <option value="" defaultValue>
            Select Category
          </option>
          {categories.map((category: { _id: string; category: string }) => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {/* Product Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-purple-500"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        />
      </div>

      {/* Product Stock */}
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-purple-500"
        >
          Stock
        </label>
        <input
          type="number"
          name="stock" // Cambiar el nombre a "stock"
          id="stock"
          value={formData.stock}
          onChange={handleChange}
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        />
      </div>

      {/* Product Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-purple-500"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="bg-gray-50 border border-purple-500 text-black text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {/* Product Image */}
      <div className="w-full flex flex-col justify-center items-center space-y-4 mb-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-purple-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-purple-500 ">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-purple-500 ">
              SVG, PNG, JPG, WEBP or GIF
            </p>
            <p className="mt-2 text-m text-purple-500 ">
              <span className=" font-semibold">
                Then click on Confirm Images
              </span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/gif, image/webp, image/svg"
            multiple
          />
        </label>
        <button
          type="button"
          onClick={uploadImages}
          disabled={loading}
          className=" text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading ? "Subiendo..." : "Confirm Images"}
        </button>
      </div>

      {/* Mostrar imagenes subida */}
      <div className="grid grid-cols-3 gap-4">
        {selectedImages.map((image, index) => (
          <div key={index}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className="h-52 w-52 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* Mostrar la URL de la imagen subida 
        {uploadedImageUrls.length > 0 && (
          <div>
            <p>Imágenes subidas con éxito:</p>
            <ul>
              {uploadedImageUrls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    style={{ width: "150px", marginTop: "10px" }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      */}
      
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Product
      </button>
    </form>
  );
}
