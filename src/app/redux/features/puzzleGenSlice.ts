import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: {
    wordList: [] as WordQueryObject[],
    generatedPuzzle: [] as WordObject[],
    notification: [] as { message: string, success: boolean; }[],
    similarPuzzles: {} as {[key: string]: string[]}
  }
};

export const puzzleGeneration = createSlice({
  name: "puzzleGeneration",
  initialState,
  reducers: {
    resetPuzzle: (state) => {
      state.value.generatedPuzzle = [];
      state.value.similarPuzzles = {};
    },
    resetNotifications: (state) => {
      state.value.notification = [];
    },
    setWordList: (state, action) => {
      state.value.wordList = action.payload;
    },
    setGeneratedPuzzle: (state, action) => {
      state.value.generatedPuzzle = action.payload;
    },
    changePuzzleWord: (state, action) => {
      state.value.generatedPuzzle[action.payload.index].word = action.payload.word;
    },
    changePuzzleHint: (state, action) => {
      state.value.generatedPuzzle[action.payload.index].hints[action.payload.hintIndex] = action.payload.hint;
    },
    deletePuzzleHint: (state, action) => {
      state.value.generatedPuzzle[action.payload.index].hints.splice(action.payload.hintIndex, 1);
    },
    setNotification: (state, action) => {
      state.value.notification.push(action.payload);
    },
    setSimilarPuzzles: (state, action) => {
      state.value.similarPuzzles = action.payload;
    }

  }
});

export const {
  resetPuzzle,
  resetNotifications,
  setWordList,
  setGeneratedPuzzle,
  changePuzzleWord,
  changePuzzleHint,
  deletePuzzleHint,
  setNotification,
  setSimilarPuzzles
} = puzzleGeneration.actions;

export default puzzleGeneration.reducer;