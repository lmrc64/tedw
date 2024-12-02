import React, { useState } from "react";
import OrderRow from "./OrderRow";
import OrderModal from "./OrderModal";
import OrderModal2 from "./OrderModal2";

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

interface DataTableComponentProps {
  orders: Order[];
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedOrder2, setSelectedOrder2] = useState<Order | null>(null);

  // Función para abrir el modal y establecer la orden seleccionada
  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  const openModal2 = (order: Order) => {
    setSelectedOrder2(order);
    setIsModalOpen2(true);
  };

  // Función para cerrar el modal
  const closeModal2 = () => {
    setIsModalOpen2(false);
    setSelectedOrder2(null);
  };

  return (
    <div className="font-primary relative overflow-x-auto rounded-lg w-full flex justify-center text-center">
      <table className="font-primary w-full max-w-6xl text-sm text-left rtl:text-right text-gray-950">
        <thead className="font-primary text-base text-neutral-950 uppercase bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 justify-center text-center">
          <tr>
            <th scope="col" className="px-6 py-3">
              Num
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Product Count
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              SubTotal
            </th>
            <th scope="col" className="px-6 py-3">
              Discount
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
              Bill Data
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderRow key={order.id} order={order} openModal={openModal} openModal2={openModal2} />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal con detalles de la orden */}
      {isModalOpen && selectedOrder && (
        <OrderModal order={selectedOrder} closeModal={closeModal} />
      )}

      {/* Modal con detalles de la orden */}
      {isModalOpen2 && selectedOrder2 && (
        <OrderModal2 order={selectedOrder2} closeModal={closeModal2} />
      )}
    </div>
    
  );
};

export default DataTableComponent;

