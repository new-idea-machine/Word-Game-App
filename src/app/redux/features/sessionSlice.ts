import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: Session;
};

type Session = {
  user: {
    email: string,
    admin: boolean;
  },
  theme: {
    dark: boolean;
  };
};

const initialState = {
  value: {
    user: {
      email: "",
      admin: false
    },
    theme: {
      dark: false
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
      console.log("Set user:", action.payload.email);
      console.log("Set admin:", action.payload.admin);
      state.value.user.email = action.payload.email;
      state.value.user.admin = action.payload.admin;
    },
    toggleTheme: (state) => {
      state.value.theme.dark = !state.value.theme.dark;
    }
  }
});

export const {
  resetSession,
  setUser,
  toggleTheme
} = session.actions;

export default session.reducer;