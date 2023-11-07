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
  extraHint: string;
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
  winningTime: number;
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
    winningTime: -1,
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