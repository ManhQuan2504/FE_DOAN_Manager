// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import functionReducer from './manager/slices/functionSlice';


const rootReducer = combineReducers({
  functions: functionReducer, // Kết hợp functionSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
