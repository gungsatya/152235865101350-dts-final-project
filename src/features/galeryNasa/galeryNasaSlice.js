import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
  itemDetail: {},
};

export const galeryNasaSlice = createSlice({
  name: "galeryNasa",
  initialState: initialStateData,
  reducers: {
    setGaleryDetail: (state, action) => {
      state.itemDetail = action.payload.itemDetail;
    },
  },
});

export const { setGaleryDetail } = galeryNasaSlice.actions;

export default galeryNasaSlice.reducer;
