import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import lottery from './reducers/lottery';

export const store = configureStore({
  reducer: {
    auth,
    lottery
  }
});
