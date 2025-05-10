import { configureStore } from '@reduxjs/toolkit'
import captainSlice  from './features/captain/captainSlice'
import userSlice  from './features/user/userSlice'

export const store = () => {
  return configureStore({
    reducer: {
      captain:captainSlice,
      user:userSlice
    }
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']