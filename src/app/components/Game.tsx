"use client";

import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { gameMode, resetGame, setPuzzle, setRules, startGame, endGame, setGuess, guessLetter, eraseLetter, setRetries, setHints, nextWord } from '@/app/redux/features/gameSlice';
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

import Grid from "./Grid";
import VirtualKeyboard from "./VirtualKeyboard";
import StartModal from "./StartModal";
import ExtraHint from "./ExtraHint";
import Retry from "./Retry";
import GameTimer from "./Timers/GameTimer";
import GameCountdown from "./GameCountdown";
import GameResults from "./GameResults";
import GameRank from "./GameRank";

import { secondsToMidnight } from "@/helpers/helpers";

export interface Puzzle {
  id: number;
  word: string;
  clue: string;
  extraHint: string;
}

const placeholderPuzzle: Puzzle[] = [
  { id: 1, word: "BENCH", clue: "Long seat", extraHint: "Park" },
  { id: 2, word: "BEACH", clue: "Sand", extraHint: "Vacation" },
  { id: 3, word: "PEACH", clue: "Fruit", extraHint: "Fuzzy" },
  { id: 4, word: "PEACE", clue: "Tranquility", extraHint: "Hippies" },
  { id: 5, word: "PLACE", clue: "Position", extraHint: "Residence" },
  // { id: 6, word: "PLANE", clue: "Wings", extraHint: "Pilot" }
];

export default function Game() {

  const dispatch = useDispatch<AppDispatch>();
  
  const { puzzle, guess, step, retries, winningTime, gameState } = useAppSelector(state => state.gameReducer.value);

  //Dynamic variables defined by the puzzle itself
  const maxSteps: number = puzzle.length || 5;
  const wordLength: number = puzzle[0]?.word.length;

  const [fadeIn, setFadeIn] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [randomIndices] = useState([2, 4]);

  const setTimeoutCookie = function() {
    // Set timeToNextGame to 60 seconds from victory for dev testing
    // We will need to update it to time remaining until midnight for production
    const timeoutTime = 60; //secondsToMidnight();

    const timeToNextGame = Date.now() + (timeoutTime * 1000); //When the timeout expires

    setCookie('timeToNextGame', timeToNextGame, { path: '/', maxAge: timeoutTime, sameSite: "none", secure: true });
  };

  const handleInput = function(character: string) {
    if (guess.length === wordLength && character === 'Enter') {
      if (guess.toUpperCase() === puzzle[step].word.toUpperCase()) {
        dispatch(nextWord());
        setFadeIn(true);
        return;
      }
      setWrongGuess(true);
    }
    if (guess.length > 0 && character === 'Backspace') {
      if (step === 0) {
        // Handle given letters in first word
        if (randomIndices.includes(guess.length - 1)) {
          dispatch(eraseLetter());
          if (randomIndices.includes(guess.length - 2)) {
            dispatch(eraseLetter());
          }
        }
      }
      dispatch(eraseLetter());
    }

    if (guess.length < wordLength && character.match(/^[a-zA-Z]{1}$/)) {
      const nextFilled = step === 0 && randomIndices.includes(guess.length + 1);
      dispatch(guessLetter(character.toUpperCase() + (nextFilled ? puzzle[0].word[guess.length + 1] : "")));
    }
  };

  //Initialize game with the puzzle object and establish game's rules at the beginning
  useEffect(() => {
    dispatch(setPuzzle(placeholderPuzzle)); // Reference to the puzzle array goes here
    dispatch(setRules({ maxRetries: 4, maxExtraHints: 2, timeLimit: 180000 })); //Set puzzle rules explicitly
  }, []);

  // Handle checking for game over condition
  useEffect(() => {
    const gameCompleted = step >= maxSteps || retries <= 0;
    if (gameCompleted) {
      setTimeoutCookie();
      dispatch(endGame());
    }
  }, [step, retries, winningTime, maxSteps]);

  // Handle physical keyboard
  useEffect(() => {
    if (gameState !== gameMode.playing) {
      return;
    }
    const handleKeyup = function(e: KeyboardEvent) {
      handleInput(e.key);
    };

    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keyup', handleKeyup);
    };
  }, [guess, gameState]);

  // Handle fade in animation for new row
  useEffect(() => {
    if (!fadeIn) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setFadeIn(false);
    }, 1000);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fadeIn]);

  // Handle shake animation when guess is wrong
  useEffect(() => {
    if (!wrongGuess) {
      return;
    }

    dispatch(setRetries(Math.max(0, retries - 1)));

    const timeoutId = window.setTimeout(() => {    // Handle given letters in first word, do not need to be retyped
      if (step === 0 && randomIndices.includes(guess.length)) {
        dispatch(setGuess(guess + puzzle[0].word[guess.length]));
      }
      setWrongGuess(false);
    }, 820);

    return () => {
      dispatch(setGuess(""));
      window.clearTimeout(timeoutId);
    };
  }, [wrongGuess]);

  return (
    <>
      <StartModal onClose={() => dispatch(startGame())} />
      <div className="w-full h-full px-4 flex flex-col items-center">
        {/* When the puzzle is coming in from an API we will need to wait for it to load before rendering */}
        {puzzle &&
          <section className="flex-1 h-full w-full m-auto flex flex-col items-stretch md:grid grid-cols-3 grid-rows-{8} gap-2">
            <div className="col-start-2 justify-self-center self-center">
              <GameTimer countDirection="down" />
            </div>
            {gameState === gameMode.playing &&
              <div className="col-start-1 col-span-2 sm:col-start-2 sm:col-span-1 font-semibold text-2xl justify-self-center self-center">
                {step < maxSteps && <h2>{puzzle[step].clue.toUpperCase()}</h2>}
              </div>}
            {gameState === gameMode.over &&
              <div className="col-start-1 col-span-3 font-semibold text-2xl justify-self-center self-center">
                <h2 className={step >= maxSteps ? "animate-bounce" : "animate-droop"}>{step < maxSteps ? "Better luck next time..." : "CONGRATULATIONS!"}</h2>
              </div>}
            <div className="self-center w-full col-start-3">
              {gameState === gameMode.playing &&
                <ExtraHint />}
            </div>
            <div className="row-span-6 justify-self-end">
              {gameState === gameMode.playing && <Retry />}
            </div>
            <div className="row-span-6 justify-self-center h-game col-start-2">
              <Grid
                fadeIn={fadeIn}
                wrongGuess={wrongGuess}
                randomIndices={randomIndices.sort()}
              />
            </div>
          </section>
        }
        <section className="flex-1">
          {gameState !== gameMode.over ?
            <div className="hidden sm:block" >
              <VirtualKeyboard keyFunction={handleInput} />
            </div>
            :
            <div className="mt-1">
              <div className="mt-3">
                <h1 className="text-center font-semibold text-2xl">RESULT</h1>
                <GameRank />
                <GameResults />
              </div>
              <GameCountdown onComplete={() => window.location.reload()} />
            </div>
          }
        </section>
      </div>
    </>
  );
}
