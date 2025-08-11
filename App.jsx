import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}
