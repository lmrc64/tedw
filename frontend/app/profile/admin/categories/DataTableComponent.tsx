import React, { useState } from "react";
import { showToast } from "@/components/interfaces/ToastNotification";

interface Category {
  id: string;
  category: string;
  description: string;
}

interface DataTableComponentProps {
  categories: Category[];
  fetchCategories: () => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ categories, fetchCategories }) => {
  const safeCategories = categories || [];
  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [updatedCategory, setUpdatedCategory] = useState<Category | null>(null);

  // Función para abrir el modal y establecer la categoría seleccionada
  const openModal = (category: Category) => {
    setSelectedCategory(category);
    setUpdatedCategory(category);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setUpdatedCategory(null);
  };

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Category
  ) => {
    if (updatedCategory) {
      setUpdatedCategory({
        ...updatedCategory,
        [field]: e.target.value,
      });
    }
  };

  // Función para manejar la edición de la categoría
  const handleEdit = async (
    e: React.FormEvent,
    categoryId: string,
    updatedCategory: Category
  ) => {
    const transformedCategory = {
      category: updatedCategory.category,
      description: updatedCategory.description,
    };

    e.preventDefault();
    try {
      const response = await fetch(
        process.env.API_ROUTE + `/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedCategory),
        }
      );
      if (response.ok) {
        showToast("Category updated successfully!", "success");
        closeModal();
      } else {
        showToast("Failed to update category!", "error");
      }
    } catch (error) {
      showToast("Error: " + error, "error");
    }
    handleFetchCategoriesWithDelay()
  };

  const handleFetchCategoriesWithDelay = () => {
    setTimeout(() => {
      fetchCategories();
    }, 3000);
  };

  return (
    <div className="relative overflow-x-auto rounded-lg w-full flex justify-center text-center">
      <table className="w-full max-w-6xl text-sm text-left rtl:text-right text-gray-950">
        <thead className="text-base text-neutral-950 uppercase bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 justify-center text-center">
          <tr>
            <th scope="col" className="px-6 py-3">
              Category Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {safeCategories.length > 0 ? (
            safeCategories.map((category) => (
              <tr
                key={category.id}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-950 whitespace-nowrap"
                >
                  {category.category}
                </th>
                <td className="px-6 py-4">{category.description}</td>
                <td className="px-6 py-4 text-center ">
                  <button
                    className="font-medium text-blue-500"
                    onClick={() => openModal(category)} // Abrir el modal con la categoría seleccionada
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal con formulario completo */}
      {isModalOpen && selectedCategory && updatedCategory && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal} // Cerrar el modal
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Edit Category Details
                </h3>
                {/* Formulario para editar la categoría */}
                <form
                  onSubmit={(e) =>
                    handleEdit(e, selectedCategory.id, updatedCategory)
                  }
                  className="space-y-4"
                >
                  {/* Campo de Nombre de Categoría */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={updatedCategory.category}
                      //disabled={true} // Deshabilitado porque no se permite editar el nombre
                      onChange={(e) => handleInputChange(e, "category")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Campo de Descripción */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={updatedCategory.description}
                      onChange={(e) => handleInputChange(e, "description")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="text-white bg-purple-600 hover:bg-purple-800 px-5 py-2.5 rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="ml-4 text-gray-600 bg-gray-200 hover:bg-gray-300 px-5 py-2.5 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableComponent;
