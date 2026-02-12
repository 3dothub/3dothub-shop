import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsResponse } from "@/lib/types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
