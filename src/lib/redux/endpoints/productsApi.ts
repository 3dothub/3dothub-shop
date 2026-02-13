import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsResponse } from "@/lib/types/product";
import type { StorefrontResponse } from "@/lib/types/storefront";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "/products",
    }),
    getStorefront: builder.query<StorefrontResponse, void>({
      query: () => "/storefront",
    }),
  }),
});

export const { useGetProductsQuery, useGetStorefrontQuery } = productsApi;
