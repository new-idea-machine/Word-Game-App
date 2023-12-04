"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPuzzle } from "../redux/features/gameSlice";
import { AppDispatch, useAppSelector } from "../redux/store";

import GameCountdown from "./GameCountdown";
import { getCookie } from "cookies-next";
import Game from "./Game";
import GameStats from "./GameStats";
import Loading from "../loading";

export default function GameLauncher() {
  const [launch, setLaunch] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const puzzleData = useAppSelector(state => state.gameReducer.value.puzzle);

  useEffect(() => {
    const timeoutCookie = getCookie('timeToNextGame');
    if (!timeoutCookie) {
      setLaunch(true);
      if (!puzzleData.length) {
        fetch('/api/get-puzzle')
          .then(response => response.json())
          .then((puzzle: PuzzleObject[]) => {
            dispatch(setPuzzle(puzzle));
          })
          .catch(error => {
            console.error('Error fetching puzzle:', error);
          });
      }
    }
  }, [dispatch, puzzleData.length]);

  return (
    <div className="container h-full w-fit pt-10 mx-auto">
      {launch && (puzzleData.length > 0 ? <Game /> : <Loading />)}
      {!launch && (
        <>
          <GameCountdown onComplete={() => setLaunch(true)} />
          <GameStats />
        </>
      )}
    </div>
  );
}