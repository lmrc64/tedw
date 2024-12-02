// src/components/DataTable/OrderModal.tsx
import React from "react";

interface Product {
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  user: string;
  email: string;
  productCount: number;
  deliveryDate: string;
  subtotal: number;
  total: number;
  paymentMethod: string;
  orderStatus: string;
  address: string;
  billAddress: string;
  billName: string;
  billPhone: string;
  billEmail: string;
  billCompany: string;
  products: Product[];
}

interface OrderModalProps {
  order: Order;
  closeModal: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, closeModal }) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="font-primary fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={closeModal}
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
              Product Details
            </h3>

            {/* Mostrar la lista de productos */}
            <div className="space-y-4">
              {order.products.map((product, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    {/* Imagen del producto */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-start text-gray-800">{product.name}</p>
                      <p className="text-ms text-start	 text-gray-500">Price: ${product.price}</p>
                      <p className="text-ms text-start	 text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={closeModal}
                className="text-white inline-flex w-full justify-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
