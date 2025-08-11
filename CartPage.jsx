import React from "react";
import { useCartState, useCartDispatch } from "../context/CartContext";

function fmt(n) {
  return Number(n).toFixed(2);
}

export default function CartPage() {
  const { items } = useCartState();
  const dispatch = useCartDispatch();

  const subtotal = items.reduce((s, it) => s + Number(it.price) * it.qty, 0);
  const discount = subtotal * 0.1; // 10%
  const finalTotal = subtotal - discount;

  function inc(id) {
    dispatch({ type: "INCREMENT_QTY", payload: { id } });
  }
  function dec(id) {
    dispatch({ type: "DECREMENT_QTY", payload: { id } });
  }
  function remove(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            {items.map((it) => (
              <div key={it.id} className="bg-white p-4 rounded shadow mb-4 flex gap-4">
                <img src={it.image} alt={it.title} className="h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{it.title}</h3>
                  <div className="text-sm text-gray-600">${fmt(it.price)} each</div>

                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => dec(it.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <div className="px-3">{it.qty}</div>
                    <button onClick={() => inc(it.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => remove(it.id)} className="ml-4 text-red-600">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${fmt(it.price * it.qty)}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white p-4 rounded shadow h-fit">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between mb-1"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
            <div className="flex justify-between mb-1"><span>Discount (10%)</span><span>-${fmt(discount)}</span></div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${fmt(finalTotal)}</span></div>
            <p className="text-xs text-gray-500 mt-2">Total updates dynamically with quantity changes.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
