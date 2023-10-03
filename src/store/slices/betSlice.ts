import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import BetDataJSON from './betData.json';

interface Teams {
  name: string;
  price: number;
}

export interface BetList {
  id: number;
  teams: Teams[];
  league: string;
  isLive: boolean;
  date: string;
  description: string;
  isToday: boolean;
}

interface InitialState {
  availableBet: BetList[];
  myBetList: BetList[];
}

const initialState: InitialState = {
  availableBet: BetDataJSON,
  myBetList: [],
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    addNewBet: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      myBetList: [...state.myBetList, action.payload],
    }),
    removeBet: (state: Draft<InitialState>, action: PayloadAction<any>) => ({
      ...state,
      myBetList: action.payload,
    }),
  },
});

export const { addNewBet, removeBet } = adminSlice.actions;

export default adminSlice.reducer;
