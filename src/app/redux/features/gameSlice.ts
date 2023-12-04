import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const gameMode = {
  start: "start",
  playing: "playing",
  over: "over"
};

type InitialState = {
  value: GameSettings;
};

type PuzzleWord = {
  id: number,
  word: string,
  clue: string,
  extraHints: string[];
};

type GameSettings = {
  puzzle: PuzzleWord[];
  word: string;
  guess: string;
  step: number;
  maxRetries: number;
  retries: number;
  maxExtraHints: number;
  extraHints: number;
  timeLimit: number;
  winningTime: null | number;
  gameState: string;
};

const initialState = {
  value: {
    puzzle: [],
    word: "",
    guess: "",
    step: 0,
    retries: 3,
    maxRetries: 3,
    extraHints: 3,
    maxExtraHints: 3,
    timeLimit: 180000,
    winningTime: null,
    gameState: gameMode.start
  } as GameSettings
} as InitialState;

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => {
      return initialState;
    },
    setPuzzle: (state, action: PayloadAction<PuzzleWord[]>) => {
      state.value.puzzle = action.payload;
      state.value.word = action.payload[0].word;
    },
    setRules: (state, action: PayloadAction<Object>) => {
      state.value = { ...state.value, ...action.payload };
      state.value.retries = state.value.maxRetries;
      state.value.extraHints = state.value.maxExtraHints;
    },
    startGame: (state) => {
      state.value.gameState = gameMode.playing;
    },
    endGame: (state) => {
      state.value.gameState = gameMode.over;
    },
    setWinningTime: (state, action: PayloadAction<number>) => {
      state.value.winningTime = action.payload;
    },
    setGuess: (state, action: PayloadAction<string>) => {
      state.value.guess = action.payload;
    },
    guessLetter: (state, action: PayloadAction<string>) => {
      state.value.guess += action.payload;
    },
    eraseLetter: (state) => {
      state.value.guess = state.value.guess.slice(0, -1);
    },
    setRetries: (state, action: PayloadAction<number>) => {
      state.value.retries = action.payload;
    },
    setHints: (state, action: PayloadAction<number>) => {
      state.value.extraHints = action.payload;
    },
    nextWord: (state) => {
      state.value.step++;
      state.value.guess = "";
      if(state.value.step >= state.value.puzzle.length) {
        state.value.gameState = gameMode.over;
      }
    }
  }
});

export const {
  resetGame, 
  setPuzzle, 
  setRules, 
  startGame, 
  endGame,
  setWinningTime,
  setGuess, 
  guessLetter, 
  eraseLetter, 
  setRetries, 
  setHints, 
  nextWord
} = game.actions;

export default game.reducer;