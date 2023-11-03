"use client";

import { useState, useEffect } from "react";
import Grid from "./Grid";
import VirtualKeyboard from "./VirtualKeyboard";
import StartModal from "./StartModal";
import { setCookie } from "cookies-next";
import ExtraHint from "./ExtraHint";
import Retry from "./Retry";
import { secondsToMidnight } from "@/helpers/helpers";
import GameTimer from "./Timers/GameTimer";
import GameCountdown from "./GameCountdown";
import GameResults from "./GameResults";
import GameRank from "./GameRank";

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
  // { id: 6, word: "PLANE", clue: "Wings", extraHint: "Pilot" }
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

  //Other settings, use these variables instead of hard coded numbers
  const timeLimit: number = 180000;
  const maxRetries: number = 3;
  const maxHints: number = 3;

  const [guess, setGuess] = useState("");
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [randomIndices] = useState([2, 4]);
  const [gameState, setGameState] = useState(game.start);
  const [hintRevealed, setHintRevealed] = useState(false);

  const [extraHints, setExtraHints] = useState(maxHints);

  const [winningTime, setWinningTime] = useState(-1);

  const [retries, setRetries] = useState(maxRetries);

  const setTimeoutCookie = function() {
    // Set timeToNextGame to 60 seconds from victory for dev testing
    // We will need to update it to time remaining until midnight for production
    const timeoutTime = 60; //secondsToMidnight();

    const timeToNextGame = Date.now() + (timeoutTime * 1000); //When the timeout expires

    setCookie('timeToNextGame', timeToNextGame, { path: '/', maxAge: timeoutTime, sameSite: "none", secure: true });
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
        return;
      }

      setWrongGuess(true);
      if (retries > 0) {
        setRetries(prev => prev - 1);
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

  // Handle checking for game over condition
  useEffect(() => {
    const gameCompleted = step >= maxSteps || retries <= 0 || winningTime >= timeLimit;
    if (gameCompleted) {
      setTimeoutCookie();
      setGameState(game.over);
    }
  }, [step, retries, winningTime, maxSteps]);

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
      <div className="w-full h-full px-4 flex flex-col items-center">
        {/* When the puzzle is coming in from an API we will need to wait for it to load before rendering */}
        {puzzle &&
          <section className="flex-1 h-full w-full m-auto grid grid-cols-3 grid-rows-{8} gap-2">
            <div className="col-start-2 justify-self-center self-center">
              <GameTimer interval={timeLimit} countDirection="down" gameState={[gameState, setGameState]} setWinningTime={setWinningTime} />
            </div>
            {gameState === game.playing &&
            <div className="col-start-1 col-span-2 sm:col-start-2 sm:col-span-1 font-semibold text-2xl justify-self-center self-center">
              {step < maxSteps && <h2>{puzzle[step].clue.toUpperCase()}</h2>}
            </div>}
            {gameState === game.over &&
            <div className="col-start-2 font-semibold text-2xl justify-self-center self-center">
              {<h2 className={step >= maxSteps ? "animate-bounce" : "animate-droop"}>{step < maxSteps ? "Better luck next time..." : "CONGRATULATIONS!"}</h2>}
              {/* Adding GameRank componente */}
              {<GameRank retries={maxRetries - retries} winningTime={winningTime} hintsUsed={maxHints - extraHints} />}
            </div>}
            <div className="self-center">
              {gameState === game.playing &&
                <ExtraHint
                  hint={hintRevealed ? puzzle[step].extraHint : null}
                  step={step}
                  setHint={() => {
                    setHintRevealed(true);
                    setExtraHints(prev => prev - 1);
                  }}
                  numOfHints={extraHints}
                />}
            </div>
            <div className="col-start-1 row-span-6 justify-self-start sm:justify-self-center">
              {gameState === game.playing && <Retry retries={retries} />}
            </div>
            <div className="col-start-2 row-span-6 justify-self-center h-game">
              <Grid
                puzzle={puzzle}
                maxSteps={maxSteps}
                step={step}
                guess={guess}
                fadeIn={fadeIn}
                wrongGuess={wrongGuess}
                randomIndices={randomIndices.sort()}
              />
            </div>
          </section>
        }
        <section className="flex-1">
          {gameState !== game.over ?
            <div className="hidden sm:block" >
              <VirtualKeyboard keyFunction={handleInput} />
            </div>
            :
            <div className="mt-1">
              <GameCountdown onComplete={() => window.location.reload()} />
              <div className="mt-3">
                <GameResults retries={maxRetries - retries} winningTime={winningTime} hintsUsed={maxHints - extraHints} />
              </div>
            </div>
          }
        </section>
      </div>
    </>
  );
}
