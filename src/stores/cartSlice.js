import { createSlice } from "@reduxjs/toolkit";

let savedCart = JSON.parse(localStorage.getItem("cart"));
if (!savedCart || !Array.isArray(savedCart.items)) {
  if (Array.isArray(savedCart)) {
    savedCart = { items: savedCart };
  } else {
    savedCart = { items: [] };
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    incrementItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
