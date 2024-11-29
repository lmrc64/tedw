"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Flip } from "react-toastify";

type ProductFormProps = {
  onSubmit: (formData: any) => void;
  error: string | null;
  success: string | null;
};

export default function ProductForm({
  onSubmit,
  error,
  success,
}: ProductFormProps) {
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
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(process.env.API_ROUTE +"/categories");
        if (!res.ok) throw new Error("Error al obtener las categorías");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      toast.warn("🦄 Please fill all inputs!!", {
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

      return;
    }
    onSubmit(formData);

    setFormData({
      name: "",
      description: "",
      image: "",
      price: "",
      stock: "",
      status: "",
      category: "",
      user: sessionStorage.getItem("id"),
    });
    setSelectedImage(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Subir la imagen y obtener la URL
  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      alert("Por favor selecciona imágenes");
      return;
    }

    setLoading(true);

    const uploadedUrls: string[] = [];
    for (const image of selectedImages) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post(
          process.env.API_ROUTE +"/upload_image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedUrls.push(response.data.url);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir una o más imágenes");
      }
    }

    setUploadedImageUrls(uploadedUrls); // Guardar las URLs subidas en el estado
    setFormData((prevState) => ({ ...prevState, image: uploadedUrls }));
    alert("Imágenes subidas con éxito");
    setLoading(false);
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
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
          className="bg-gray-50 border border-purple-500 text-purple-500 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
          required
        >
          <option value="">Select Status</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {/* Product Image */}
      <div className="w-full flex flex-col justify-center items-center space-y-4 mb-4">
        <div>
          <img
            id="preview_img"
            className="h-52 w-52 object-cover rounded-lg"
            src="/profile/unknow.png"
            alt="Product preview"
          />
        </div>
        <label>
          <span className="sr-only">Choose product image</span>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/gif, image/webp"
            multiple
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
          />
        </label>
        <button type="button" onClick={uploadImages} disabled={loading}>
          {loading ? "Subiendo..." : "Subir Imagen"}
        </button>
      </div>
      {/* Mostrar la URL de la imagen subida */}
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Product
      </button>
    </form>
  );
}
