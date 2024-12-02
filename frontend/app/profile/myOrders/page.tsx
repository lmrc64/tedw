"use client";
import React, { useState, useEffect } from "react";
import DataTableComponent from "./DataTableComponent";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/interfaces/ToastNotification";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.API_ROUTE + "/orders/user/" + sessionStorage.getItem("id")
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      const transformedOrders = data.orders.map((order: any) => ({
        id: order._id,
        user: `${order.user.firstname} ${order.user.lastname}`,
        email: order.user.email,
        address: order.address,
        productCount: order.products.reduce(
          (acc: number, product: any) => acc + product.quantity,
          0
        ),
        deliveryDate: new Date(order.delivery_date).toLocaleDateString(),
        subtotal: order.subtotal,
        total: order.total,
        paymentMethod: order.paymentMethod,
        orderStatus: order.status,
        billAddress: order.billaddress,
        billName: order.billname,
        billPhone: order.billphone,
        billEmail: order.billemail,
        billCompany: order.billcompany,
        products: order.products.map((product: any) => ({
          image: product.product.image[0], 
          name: product.product.name,
          price: product.product.price, 
          quantity: product.quantity, 
        })),
      }));
      setOrders(transformedOrders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-primary">
      <ToastContainer pauseOnFocusLoss={false} />
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardFooter>
          <DataTableComponent orders={orders} />
        </CardFooter>
      </Card>
    </div>
  );
}
