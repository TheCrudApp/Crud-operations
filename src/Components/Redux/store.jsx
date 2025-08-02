import { configureStore } from '@reduxjs/toolkit';
import getbook from './Bookslice';


export const store = configureStore({
  reducer: {
   book:getbook,
  },
})