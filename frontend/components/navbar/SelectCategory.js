import { useEffect, useState } from "react";

export default function Categories({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);

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

  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };

  return (
    <div className="relative">
      <select
        className=" font-primary font-extrabold peer p-4 pe-9 block w-full bg-gray-100 border-gray-200 rounded-lg focus:border-purple-700 focus:ring-purple-700 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2  [&:not(:placeholder-shown)]:pt-6  [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
        onChange={handleCategoryChange}
      >
        <option value="" defaultValue>
          All Categories
        </option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
            className="hover:bg-purple-500 hover:text-white"
          >
            {category.category}
          </option>
        ))}
      </select>
      <label className=" font-primary font-extrabold text-xl absolute top-0 left-0 p-2 mx-auto h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-purple-700 peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-base peer-focus:-translate-y-1.5 peer-focus:text-purple-700 peer-[:not(:placeholder-shown)]:text-base peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-purple-700">
        Select an Category
      </label>
    </div>
  );
}
