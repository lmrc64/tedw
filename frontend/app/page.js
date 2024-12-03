"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/navbar/Nav";
import { useState } from "react";

function PageLayout() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userAuthenticated = false; 

    if (!userAuthenticated) {
      router.push("/store");
    }
  }, []); // El array de dependencias está vacío, ya que `router` no necesita ser dependencias

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
export default PageLayout;