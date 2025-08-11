import React from "react";
import { NavLink } from "react-router-dom";
import { useCartState } from "../context/CartContext";

export default function Header() {
  const { items } = useCartState();
  const totalCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold">
          My Store
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600" : ""}>Products</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? "text-blue-600" : "relative"}>
            Cart
            <span className="ml-2 inline-flex items-center justify-center bg-blue-600 text-white rounded-full text-xs w-6 h-6">
              {totalCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
