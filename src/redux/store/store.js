import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slide/couterSlide";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
