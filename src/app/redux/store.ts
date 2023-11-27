import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './features/sessionSlice';
import gameReducer from './features/gameSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    gameReducer,
    sessionReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
