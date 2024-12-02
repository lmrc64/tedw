"use client";
import React, { useState, useEffect } from "react";
import DataTableComponent from "./DataTableComponent";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SquarePlus } from "lucide-react";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/components/interfaces/ToastNotification";

export default function Page() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    codigo: "",
    discount: "",
    expiration_date: "",
    maximum_use: "",
    status: "Active",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.API_ROUTE + "/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showToast("Coupon created successfully!", "success");
        setIsModalOpen(false);
        setFormData({
          codigo: "",
          discount: "",
          expiration_date: "",
          maximum_use: "",
          status: "",
        });
        fetchCoupons();
      } else {
        showToast("Failed to create coupon: El código ya ha sido registrado", "error");
      }
    } catch (error) {
      //console.error("Error:", error);
      showToast("An error occurred while creating the coupon", "error");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.API_ROUTE + "/coupons");
      if (!response.ok) {
        throw new Error("Failed to fetch coupons");
      }
      const data = await response.json();
      const transformedCoupons = data.coupons.map((coupon: any) => ({
        id: coupon._id,
        code: coupon.codigo,
        discount: coupon.discount,
        expiry: new Date(coupon.expiration_date).toLocaleDateString(),
        status: coupon.status,
      }));
      setCoupons(transformedCoupons);
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
          <CardTitle>Coupons of discount</CardTitle>
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-primary text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2 ml-auto"
            type="button"
          >
            <SquarePlus className="h-5 w-5" />
            Create a new Coupon !!
          </button>
        </CardHeader>
        <CardFooter>
          <DataTableComponent coupons={coupons} fetchCoupons={fetchCoupons}/>
          <br></br>
          <br></br>
          <br></br>
        </CardFooter>
      </Card>
      {/* Modal */}
      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
