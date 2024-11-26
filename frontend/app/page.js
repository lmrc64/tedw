"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/navbar/Nav";
import { useState } from "react";

export default function PageLayout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userAuthenticated = false; 

    if (!userAuthenticated) {
      router.push("/store");
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
