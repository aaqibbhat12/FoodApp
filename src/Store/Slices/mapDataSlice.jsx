import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  area: '',
  city: '',
  state: '',
  pincode: '',
  latitude: null,
  longitude: null,
};

const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.area = action.payload.area;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.street=action.payload.street;
      state.pincode = action.payload.pincode;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.landmark = action.payload.landmark;
    },
  },
});

export const { setAddress } = mapDataSlice.actions;
export default mapDataSlice.reducer;
