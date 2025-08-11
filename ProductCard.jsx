import React from "react";
import { useCartState, useCartDispatch } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const inCart = items.some((it) => it.id === product.id);

  function addToCart() {
    dispatch({ type: "ADD_ITEM", payload: product });
  }
  function removeFromCart() {
    dispatch({ type: "REMOVE_ITEM", payload: { id: product.id } });
  }

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 object-contain mb-3"
      />
      <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
      <p className="text-xs text-gray-600 my-2 truncate-lines-3">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-bold">${Number(product.price).toFixed(2)}</div>
        {!inCart ? (
          <button onClick={addToCart} className="bg-blue-600 text-white px-3 py-1 rounded">
            Add to Cart
          </button>
        ) : (
          <button onClick={removeFromCart} className="bg-red-500 text-white px-3 py-1 rounded">
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
}
