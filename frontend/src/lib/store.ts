import { configureStore } from '@reduxjs/toolkit'
import captainSlice  from './features/captain/captainSlice'
import userSlice  from './features/user/userSlice'
import rideSlice  from './features/ride/rideSlice'

export const store = () => {
  return configureStore({
    reducer: {
      captain:captainSlice,
      user:userSlice,
      ride:rideSlice,
    }
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']