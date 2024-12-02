// src/components/DataTable/OrderModal.tsx
import React from "react";

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
        <div className="relative bg-white rounded-lg shadow ">
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
          <div className="p-4 md:p-5">
            <p className="text-gray-500 font-semibold">Bill Order</p>
            <ul className="space-y-4 mb-4 text-start">
              {[
                { label: "Bill Name", value: order.billName },
                { label: "Bill Company", value: order.billCompany },
                {
                  label: "Bill Contact",
                  value: `Phone: ${order.billPhone} | Email: ${order.billEmail}`,
                },
                { label: "Bill Address", value: order.billAddress },
              ].some((item) => !item.value) ? (
                <li>
                  <div className="p-5 text-gray-500 text-center">
                    <p>No se realizó facturación</p>
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <label
                      htmlFor="job-1"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-gray-900 hover:bg-gray-100 "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Bill Name
                        </div>
                        <div className="w-full text-gray-500">
                          {order.billName}
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="job-2"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-gray-900 hover:bg-gray-100 "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Bill Company
                        </div>
                        <div className="w-full text-gray-500">
                          {order.billCompany}
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="job-3"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-gray-900 hover:bg-gray-100 "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Bill Contact
                        </div>
                        <div className="w-full text-gray-500">
                          {order.billPhone && order.billEmail ? (
                            <>
                              Phone: {order.billPhone} <br />
                              Email: {order.billEmail}
                            </>
                          ) : (
                            "No se realizó facturación"
                          )}
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="job-4"
                      className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-gray-900 hover:bg-gray-100 "
                    >
                      <div className="block">
                        <div className="w-full text-lg font-semibold">
                          Bill Address
                        </div>
                        <div className="w-full text-gray-500">
                          {order.billAddress}
                        </div>
                      </div>
                    </label>
                  </li>
                </>
              )}
            </ul>

            <button
              className="text-white inline-flex w-full justify-center bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
