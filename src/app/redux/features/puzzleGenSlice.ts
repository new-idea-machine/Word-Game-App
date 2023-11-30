import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: {
    wordList: [] as WordQueryObject[],
    generatedPuzzle: [] as WordObject[],
  }
};

export const puzzleGeneration = createSlice({
  name: "puzzleGeneration",
  initialState,
  reducers: {
    resetPuzzle: (state) => {
      state.value.generatedPuzzle = [];
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
    }

  }
});

export const {
  resetPuzzle,
  setWordList,
  setGeneratedPuzzle,
  changePuzzleWord,
  changePuzzleHint,
  deletePuzzleHint
} = puzzleGeneration.actions;

export default puzzleGeneration.reducer;