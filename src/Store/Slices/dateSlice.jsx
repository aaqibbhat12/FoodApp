import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dates: {
    '/': '',
    '/orders': '',
    '/reports': '',
  },
};


const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action) => {
      const { route, date } = action.payload;
      state.dates[route] = date; // Update date for a specific route
    },
  },

});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
