import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/redux/slice/cartSlice";
import { productsApi } from "@/lib/redux/endpoints/productsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
