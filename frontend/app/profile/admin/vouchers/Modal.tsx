// components/Modal.tsx
import React from "react";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  formData: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="font-primary">
      <div
        id="newCoupon"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Create a New Coupon
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                onClick={() => closeModal()} // Cerrar el modal
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
            </div>
            {/* Modal Content */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Coupon Code */}
                <div>
                  <label
                    htmlFor="codigo"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="codigo"
                    id="codigo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="SUMMER2024"
                    value={formData.codigo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Discount Percentage */}
                <div>
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    name="discount"
                    id="discount"
                    min="0"
                    max="100"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="15"
                    value={formData.discount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label
                    htmlFor="expiration_date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expiration_date"
                    id="expiration_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.expiration_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Maximum Use */}
                <div>
                  <label
                    htmlFor="maximum_use"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Maximum Uses
                  </label>
                  <input
                    type="number"
                    name="maximum_use"
                    id="maximum_use"
                    min="1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="100"
                    value={formData.maximum_use}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.status}
                    onChange={(e) => {
                        handleInputChange(e);
                        console.log("Status changed to:", e.target.value); // Depuración
                      }}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
