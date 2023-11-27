import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: Session;
};

export type PuzzleWord = {
  id: number,
  word: string,
  clue: string,
  extraHints: string[];
};

type Session = {
  user: {
    email: string,
    admin: boolean;
  },
};

const initialState = {
  value: {
    user: {
      email: "",
      admin: false
    }
  } as Session
} as InitialState;

export const session = createSlice({
  name: "session",
  initialState,
  reducers: {
    resetSession: () => { // Use this reducer for logging out
      return initialState;
    },
    setUser: (state, action) => {
      state.value.user.email = action.payload.email;
      state.value.user.admin = action.payload.admin || false;
    }
  }
});

export const {
  resetSession,
  setUser,
} = session.actions;

export default session.reducer;