"use client";

import { useState, useEffect } from "react";
import Grid from "./Grid";
import VirtualKeyboard from "./VirtualKeyboard";
import GameStats from "./GameStats";
import StartModal from "./StartModal";
import { setCookie } from "cookies-next";
import ExtraHint from "./ExtraHint";

export interface Puzzle {
  id: number;
  word: string;
  clue: string;
  extraHint: string;
}

const puzzle: Puzzle[] = [
  { id: 1, word: "BENCH", clue: "Long seat", extraHint: "Park" },
  { id: 2, word: "BEACH", clue: "Sand", extraHint: "Vacation" },
  { id: 3, word: "PEACH", clue: "Fruit", extraHint: "Fuzzy" },
  { id: 4, word: "PEACE", clue: "Tranquility", extraHint: "Hippies" },
  { id: 5, word: "PLACE", clue: "Position", extraHint: "Residence" },
  { id: 6, word: "PLANE", clue: "Wings", extraHint: "Pilot" }
];

const game = {
  start: "start",
  playing: "playing",
  over: "over"
};

export default function Game() {

  //Dynamic variables defined by the puzzle itself
  const maxSteps: number = puzzle.length;
  const wordLength: number = puzzle[0].word.length;

  const [guess, setGuess] = useState("");
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [randomIndices] = useState([2, 4]);
  const [gameState, setGameState] = useState(game.start);
  const [hintRevealed, setHintRevealed] = useState(false);

  const setTimeoutCookie = function() {
    // Set timeToNextGame to 60 seconds from victory for dev testing
    // We will need to update it to time remaining until midnight for production
    const timeToNextGame = Date.now() + (60 * 1000);
    setCookie('timeToNextGame', timeToNextGame, { path: '/', maxAge: timeToNextGame, sameSite: "none", secure: true });
  };

  const startGame = function() {
    setGameState(game.playing);
  };

  const handleInput = function(character: string) {
    if (guess.length === wordLength && character === 'Enter') {
      if (guess.toUpperCase() === puzzle[step].word.toUpperCase()) {
        setStep(prev => prev + 1);
        setGuess("");
        setHintRevealed(false);
        setFadeIn(true);
      } else {
        setWrongGuess(true);
      }
    }
    if (guess.length > 0 && character === 'Backspace') {
      setGuess(prev => prev.slice(0, prev.length - 1));

      // Handle given letters in first word
      if (step === 0 && randomIndices.includes(guess.length - 1)) {
        setGuess(prev => prev.slice(0, prev.length - 1));
        if (step === 0 && randomIndices.includes(guess.length - 2)) {
          setGuess(prev => prev.slice(0, prev.length - 1));
        }
      }
    }
    if (guess.length < wordLength && character.match(/^[a-zA-Z]{1}$/)) {
      setGuess(prev => prev + character.toUpperCase());
    }
  };

  // Handle checking for victory condition
  useEffect(() => {
    const gameCompleted = step >= maxSteps;
    if (gameCompleted) {
      setTimeoutCookie();
      setGameState(game.over);
    }
  }, [step, maxSteps]);

  // Handle physical keyboard
  useEffect(() => {
    if (gameState !== game.playing) {
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

    const timeoutId = window.setTimeout(() => {
      setWrongGuess(false);
    }, 820);
    return () => {
      setGuess("");
      window.clearTimeout(timeoutId);
    };
  }, [wrongGuess]);

  // Handle given letters in first word, do not need to be retyped
  if (step === 0 && randomIndices.includes(guess.length)) {
    setGuess(prev => prev + puzzle[0].word[guess.length]);
  }

  return (
    <>
      <StartModal onClose={startGame} />
      <div className="w-full h-full px-4 md:px-24 flex flex-col items-center">
        {/* When the puzzle is coming in from an API we will need to wait for it to load before rendering */}
        {puzzle &&
          <section className="flex-1 h-full w-full m-auto">
            <div className="grid grid-cols-3 h-20">
              <div className="flex justify-end items-center font-semibold text-2xl">
                {/* Extra tries component goes here */}
              </div>
              <div className="flex justify-center items-center font-semibold text-2xl">
                {gameState === game.over && <h2 className={step >= maxSteps ? "animate-bounce" : "animate-droop"}>{step < maxSteps ? "Better luck next time..." : "CONGRATULATIONS!"}</h2>}
                {gameState === game.playing && step < maxSteps && <h2>{puzzle[step].clue.toUpperCase()}</h2>}
              </div>
              <div className="flex justify-start items-center font-semibold text-2xl">
                {gameState === game.playing && <ExtraHint hint={hintRevealed ? puzzle[step].extraHint : null} setHint={() => setHintRevealed(true)} />}
              </div>
            </div>
            <Grid
              puzzle={puzzle}
              maxSteps={maxSteps}
              step={step}
              guess={guess}
              fadeIn={fadeIn}
              wrongGuess={wrongGuess}
              randomIndices={randomIndices.sort()}
            />
          </section>
        }
        <section className="flex-1">
          {gameState !== game.over ?
            <VirtualKeyboard keyFunction={handleInput} />
            :
            <GameStats />
          }
        </section>

      </div>
    </>
  );
}
