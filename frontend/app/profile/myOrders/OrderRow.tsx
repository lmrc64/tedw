// src/components/DataTable/OrderRow.tsx
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

interface OrderRowProps {
  order: Order;
  openModal: (order: Order) => void;
  openModal2: (order: Order) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  openModal,
  openModal2,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 border-b";
      case "completed":
        return "bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-50 border-b";
      case "cancelled":
        return "bg-gradient-to-r from-red-200 via-red-100 to-red-50 border-b";
      default:
        return "bg-gray-200";
    }
  };
  let num = 0;
  return (
    <tr className={`border-b ${getStatusColor(order.orderStatus)} text-center`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-950 whitespace-nowrap"
      >
        {(num += 1)}
      </th>
      <td className="px-6 py-4">{order.deliveryDate}</td>
      <td className="px-6 py-4">{order.productCount}</td>
      <td className="px-6 py-4">{order.address}</td>
      <td className="px-6 py-4">${order.subtotal}</td>
      <td className="px-6 py-4">
        {(((order.subtotal - order.total) / order.subtotal) * 100).toFixed(0)}%
      </td>
      <td className="px-6 py-4">${order.total}</td>
      <td className="px-6 py-4">{order.paymentMethod}</td>
      <td className="px-6 py-4 text-center">
        <button
          className="font-medium text-blue-500"
          onClick={() => openModal(order)}
        >
          Click
        </button>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          className="font-medium text-blue-500"
          onClick={() => openModal2(order)}
        >
          {order.orderStatus}
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
