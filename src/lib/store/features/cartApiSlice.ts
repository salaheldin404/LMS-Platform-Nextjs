import { apiSlice } from "../services/apiSlice";
import type { Cart } from "@/types/cart";
import { transformApiError } from "@/lib/utils";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => "/cart/me",

      transformResponse: (response: { data: Cart }) => {
        return response.data;
      },
      transformErrorResponse: transformApiError,

      providesTags: (result) => {
        if (result) {
          return [
            { type: "Cart" as const, id: result._id },
            { type: "Cart" as const, id: "LIST" },
          ];
        } else {
          return [{ type: "Cart" as const, id: "LIST" }];
        }
      },
    }),
    removeFromCart: builder.mutation<void, string>({
      query: (courseId: string) => ({
        url: `/cart/${courseId}`,
        method: "DELETE",
      }),
      transformErrorResponse: transformApiError,
      invalidatesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),
    addToCart: builder.mutation<Cart, string>({
      query: (courseId: string) => ({
        url: `/cart/`,
        method: "POST",
        body: { courseId },
      }),
      transformResponse: (response: { data: Cart }) => {
        return response.data;
      },
      transformErrorResponse: transformApiError,
      invalidatesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      transformErrorResponse: transformApiError,
      invalidatesTags: [{ type: "Cart" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useAddToCartMutation,
  useClearCartMutation,
} = cartApiSlice;
