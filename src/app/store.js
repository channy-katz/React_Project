import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/order/orderSlice";
import userSlice from "../features/user/userSlice";
// Import basketSlice (assuming it exists)
import basketSlice from "../features/order/orderSlice"; // Adjust the path if necessary

export const store = configureStore({
  reducer: {
    order: orderSlice,
    user: userSlice,
    basket: orderSlice, // Add the basket slice to the reducers
  },
});
