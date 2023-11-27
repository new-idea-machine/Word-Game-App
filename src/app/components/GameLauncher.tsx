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
import Logout from "./Logout";

const jwt = require('jsonwebtoken');
const secretKey = 'baseOnBalls';

export interface Puzzle {
  id: number;
  word: string;
  clue: string;
  extraHints: string[];
}

export default function GameLauncher() {
  const [launch, setLaunch] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const puzzleData = useAppSelector(state => state.gameReducer.value.puzzle);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const timeoutCookie = getCookie('timeToNextGame');
    if (!timeoutCookie) {
      setLaunch(true);
      if (!puzzleData.length) {
        fetch('/api/get-puzzle')
          .then(response => response.json())
          .then((puzzle: Puzzle[]) => {
            dispatch(setPuzzle(puzzle));
          })
          .catch(error => {
            console.error('Error fetching puzzle:', error);
          });
      }
    }
  }, [dispatch, puzzleData.length]);

  useEffect(() => {
    const usernameCookie = getCookie("username");
    if (usernameCookie) {
      const decodedUsername = jwt.verify(usernameCookie, secretKey).username;
      setUsername(decodedUsername);
    } else {
      setUsername(null);
    }
  }, []);

  return (
    <div className="container h-full w-fit pt-10 mx-auto">
      {username && <Logout username={username} />}
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