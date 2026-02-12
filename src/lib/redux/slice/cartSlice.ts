import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/types/product";

export type CartItem = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const findItemIndex = (items: CartItem[], id: string) =>
  items.findIndex((item) => item._id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const index = findItemIndex(state.items, action.payload._id);
      if (index >= 0) {
        state.items[index].quantity += 1;
        return;
      }

      state.items.push({
        _id: action.payload._id,
        title: action.payload.title,
        price: action.payload.price,
        quantity: 1,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const index = findItemIndex(state.items, action.payload._id);
      if (index >= 0) {
        state.items[index].quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
