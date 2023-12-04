import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './features/sessionSlice';
import gameReducer from './features/gameSlice';
import puzzleGenReducer from './features/puzzleGenSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    gameReducer,
    sessionReducer,
    puzzleGenReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
