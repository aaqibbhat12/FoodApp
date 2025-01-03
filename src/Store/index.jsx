// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import addressReducer from '../Store/Slices/mapDataSlice';
import dateReducer from '../Store/Slices/dateSlice'
import orderReducer from "../Store/Slices/OrderSlice"

const store = configureStore({
  reducer: {
    address: addressReducer,
    date: dateReducer,
    orders: orderReducer,
  },
});

export default store;
