import { RootState } from '@/lib/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CaptainState {
  currentCaptain: Captain | null;
  captainList: Captain[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CaptainState = {
  currentCaptain: null,
  captainList: [],
  isLoading: false,
  error: null
}

export const captainSlice = createSlice({
  name: 'captain',
  initialState,
  reducers: {
    setCaptain: (state, action: PayloadAction<Captain>) => {
      state.currentCaptain = action.payload;
    },
    resetCaptain: (state) => {
      state.currentCaptain = null;
    },
    setCaptainList: (state, action: PayloadAction<Captain[]>) => {
      state.captainList = action.payload;
    },
    addCaptain: (state, action: PayloadAction<Captain>) => {
      state.captainList.push(action.payload);
    },
    updateCaptain: (state, action: PayloadAction<Captain>) => {
      const index = state.captainList.findIndex(captain => captain._id === action.payload._id);
      if (index !== -1) {
        state.captainList[index] = action.payload;
      }
      if (state.currentCaptain?._id === action.payload._id) {
        state.currentCaptain = action.payload;
      }
    },
    removeCaptain: (state, action: PayloadAction<string>) => {
      state.captainList = state.captainList.filter(captain => captain._id !== action.payload);
      if (state.currentCaptain?._id === action.payload) {
        state.currentCaptain = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
})

export const { 
  setCaptain, 
  resetCaptain, 
  setCaptainList, 
  addCaptain, 
  updateCaptain, 
  removeCaptain, 
  setLoading, 
  setError 
} = captainSlice.actions;

export const selectCurrentCaptain = (state: RootState) => state.captain.currentCaptain;
export const selectCaptainList = (state: RootState) => state.captain.captainList;
export const selectCaptainLoading = (state: RootState) => state.captain.isLoading;
export const selectCaptainError = (state: RootState) => state.captain.error;

export default captainSlice.reducer;