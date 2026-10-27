import { configureStore } from '@reduxjs/toolkit'
import athletesReducer from '../features/athletesSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
  reducer: {
    athletes: athletesReducer,
    ui: uiReducer,
  },
})