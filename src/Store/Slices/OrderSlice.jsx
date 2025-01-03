// src/redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {
      console.log("Action payload:", action.payload);
      state.orders.push(action.payload); 
    },
  },
});

export const { addNewOrder } = orderSlice.actions;

export default orderSlice.reducer;
