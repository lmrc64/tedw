import React, { useState } from "react";
import { showToast } from "@/components/interfaces/ToastNotification";

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiry: string;
  status: string;
}

interface DataTableComponentProps {
  coupons: Coupon[];
  fetchCoupons: () => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ coupons, fetchCoupons  }) => {
  const safeCoupons = coupons || [];
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-50 border-b ";
      case "expired":
        return "bg-gradient-to-r from-red-200 via-red-100 to-red-50 border-b ";
      default:
        return "bg-gray-200";
    }
  };
  const handleSomeAction = () => {
    fetchCoupons();
  };

  // Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [updatedCoupon, setUpdatedCoupon] = useState<Coupon | null>(null);

  // Función para abrir el modal y establecer el cupón seleccionado
  const openModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setUpdatedCoupon(coupon);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoupon(null);
    setUpdatedCoupon(null);
  };

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Coupon
  ) => {
    if (updatedCoupon) {
      setUpdatedCoupon({
        ...updatedCoupon,
        [field]: e.target.value,
      });
    }
  };

  const handleEdit = async (
    e: React.FormEvent,
    couponId: string,
    updatedCoupon: Coupon
  ) => {
    const transformedCoupon = {
      code: updatedCoupon.code,
      discount: updatedCoupon.discount,
      expiration_date: updatedCoupon.expiry,
      status: updatedCoupon.status,
    };

    e.preventDefault();
    try {
      const response = await fetch(
        process.env.API_ROUTE + `/coupons/${couponId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedCoupon),
        }
      );
      console.log(updatedCoupon);
      if (response.ok) {
        showToast("Coupon updated successfully!", "success");
        closeModal();
      } else {
        showToast("Failed to update coupon!", "error");
        //console.error("Failed to update coupon");
      }
    } catch (error) {
      showToast("Error: " + error, "error");
      //console.error("Error:", error);
    }
    handleSomeAction()
  };

  return (
    <div className="relative overflow-x-auto rounded-lg w-full flex justify-center text-center">
      <table className="w-full max-w-6xl text-sm text-left rtl:text-right text-gray-950 ">
        <thead className="text-base text-neutral-950 uppercase bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 justify-center text-center">
          <tr>
            <th scope="col" className="px-6 py-3">
              Coupon Code
            </th>
            <th scope="col" className="px-6 py-3">
              Discount (%)
            </th>
            <th scope="col" className="px-6 py-3">
              Expiry Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {safeCoupons.length > 0 ? (
            safeCoupons.map((coupon) => (
              <tr
                key={coupon.id}
                className={`border-b ${getStatusColor(
                  coupon.status
                )} text-center`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-950 whitespace-nowrap "
                >
                  {coupon.code}
                </th>
                <td className="px-6 py-4">{coupon.discount}%</td>
                <td className="px-6 py-4">{coupon.expiry}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="font-medium text-blue-500"
                    onClick={() => openModal(coupon)} // Abrir el modal con el cupón seleccionado
                  >
                    {coupon.status}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                No coupons available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal con formulario completo */}
      {isModalOpen && selectedCoupon && updatedCoupon && (
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
                  Edit Coupon Details
                </h3>
                {/* Formulario para editar todo */}
                <form
                  onSubmit={(e) =>
                    handleEdit(e, selectedCoupon.id, updatedCoupon)
                  }
                  className="space-y-4"
                >
                  {/* Campo de Código */}
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      value={updatedCoupon.code}
                      disabled={true}
                      onChange={(e) => handleInputChange(e, "code")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Campo de Descuento */}
                  <div>
                    <label
                      htmlFor="discount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      id="discount"
                      value={updatedCoupon.discount}
                      onChange={(e) => handleInputChange(e, "discount")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Campo de Fecha de Expiración */}
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      id="expiry"
                      value={updatedCoupon.expiry}
                      onChange={(e) => handleInputChange(e, "expiry")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Campo de Estado */}
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={updatedCoupon.status}
                      onChange={(e) => handleInputChange(e, "status")}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                    </select>
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
