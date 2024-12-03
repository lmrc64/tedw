// app/store/layout.tsx
"use client";

import React, { useState, createContext } from "react";
import Nav from "@/components/navbar/Nav";
import Footer from "@/components/footer/Footer";

// Crear contexto

export default function Layout({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  console.log("searchQuery en Layout:", searchQuery);
  console.log("selectedCategory en Layout:", selectedCategory);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        handleCategoryChange,
        searchQuery,
        handleSearch,
      }}
    >
      <div>
        <Nav onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
        <main>{children}</main>
        <Footer />
      </div>
    </CategoryContext.Provider>
  );
}
