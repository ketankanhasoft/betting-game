import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewBet, removeBet } from "@/store/slices/betSlice";

export const addBet = createAsyncThunk(
  "addNewBet",
  async (_request: any, { dispatch }) => {
    dispatch(addNewBet(_request.data));
  }
);

export const deleteBet = createAsyncThunk(
  "deleteBet",
  async (_request: any, { dispatch }) => {
    dispatch(removeBet(_request));
  }
);
