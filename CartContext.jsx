import React, { createContext, useContext, useReducer } from "react";

/*
 State shape:
 { items: [ { id, title, price, image, qty, ... } ] }
*/

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const exists = state.items.find((it) => it.id === product.id);
      if (exists) {
        // As per spec: if already in cart show "Remove from Cart" on product list.
        // So ADD does nothing if already present.
        return state;
      }
      return { ...state, items: [...state.items, { ...product, qty: 1 }] };
    }

    case "REMOVE_ITEM": {
      const id = action.payload.id;
      return { ...state, items: state.items.filter((it) => it.id !== id) };
    }

    case "INCREMENT_QTY": {
      const id = action.payload.id;
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === id ? { ...it, qty: it.qty + 1 } : it
        ),
      };
    }

    case "DECREMENT_QTY": {
      const id = action.payload.id;
      // If qty becomes 0, remove item
      return {
        ...state,
        items: state.items
          .map((it) =>
            it.id === id ? { ...it, qty: Math.max(0, it.qty - 1) } : it
          )
          .filter((it) => it.qty > 0),
      };
    }

    default:
      throw new Error("Unknown action: " + action?.type);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  return useContext(CartStateContext);
}
export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
