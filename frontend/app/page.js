"use client"; // Para que este código se ejecute en el cliente

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/navbar/Nav";
import { useState } from "react";

export default function PageLayout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Supón que tienes una lógica condicional, por ejemplo, si el usuario está autenticado:
    const userAuthenticated = false; // Reemplaza con tu lógica de autenticación

    if (!userAuthenticated) {
      // Redirige si el usuario no está autenticado
      router.push("/store"); // Redirige a la página de login
    }
  }, [router]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Nav onCategoryChange={handleCategoryChange} />
      <div>{children}</div>
    </div>
  );
}
