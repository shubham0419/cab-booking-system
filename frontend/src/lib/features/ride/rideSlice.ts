import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RideState = {
  pickup:null,
  destination: null,
  selectedVehicle: null,
  ridePrice: null,
  activeInput: null,
  currentRide: null,
  isEnded: null,
  isLoading: true,
  error: null
};

export const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setCurrentRide: (state, action: PayloadAction<Ride>) => {
      state.currentRide = action.payload;
      state.error = null;
    },

    setPickup: (state, action: PayloadAction<string>) => {
      state.pickup = action.payload;
    },

    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },

    setActiveInput: (state, action: PayloadAction<string>) => {
      state.activeInput = action.payload;
    },

    setSelectedVehicle: (state, action: PayloadAction<string>) => {
      state.selectedVehicle = action.payload;
    },

    setRidePrice: (state, action: PayloadAction<number>) => {
      state.ridePrice = action.payload;
    },

    setRideEnded: (state, action: PayloadAction<boolean>) => {
      state.isEnded = action.payload;
    },

    resetRideEnded: (state) => {
      state.isEnded = null;
    },
    
    clearCurrentRide: (state) => {
      state.currentRide = null;
    },
    
    setRideStatus: (state, action: PayloadAction<{ id: string; status: RideStatus }>) => {
      const { id, status } = action.payload;
      
      if (state.currentRide && state.currentRide._id === id) {
        state.currentRide.status = status;
        state.currentRide.updatedAt = new Date().toISOString();
      }
    },
    
    // Set ride captain
    setRideCaptain: (state, action: PayloadAction<{ id: string; captainId: string }>) => {
      const { id, captainId } = action.payload;
      
      if (state.currentRide && state.currentRide._id === id) {
        state.currentRide.captain = captainId;
        state.currentRide.updatedAt = new Date().toISOString();
      }
    },
    
    // Update ride payment details
    updateRidePayment: (state, action: PayloadAction<{ 
      id: string; 
      paymentId?: string;
      orderId?: string;
      signature?: string;
    }>) => {
      const { id, paymentId, orderId, signature } = action.payload;
      
      if (state.currentRide && state.currentRide._id === id) {
        if (paymentId) state.currentRide.paymentId = paymentId;
        if (orderId) state.currentRide.orderId = orderId;
        if (signature) state.currentRide.signature = signature;
        state.currentRide.updatedAt = new Date().toISOString();
      }
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  }
});

export const {
  setCurrentRide,
  clearCurrentRide,
  setRideStatus,
  setRideCaptain,
  updateRidePayment,
  setLoading,
  setError,
  clearError,
  setPickup,
  setDestination,
  setActiveInput,
  setSelectedVehicle,
  setRidePrice,
  setRideEnded,
  resetRideEnded,
} = rideSlice.actions;

// Selectors
export const selectCurrentRide = (state: RootState) => state.ride.currentRide;
export const selectRideLoading = (state: RootState) => state.ride.isLoading;
export const selectRideError = (state: RootState) => state.ride.error;

export default rideSlice.reducer;
