import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { gameMode, endGame, setWinningTime } from '@/app/redux/features/gameSlice';
import { useAppSelector } from '@/app/redux/store';

export default function CountDown() {

  const dispatch = useDispatch();

  const { timeLimit, gameState } = useAppSelector(state => state.gameReducer.value);

  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [timerOn, setTimerOn] = useState(false);

  // handle countdown
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | undefined = undefined;

    timerOn
      ? (interval = setInterval(() => {
        setTimeRemaining(prev => prev - 10);
      }, 10))
      : clearInterval(interval);

    return () => clearInterval(interval);
  }, [timerOn]);

  // handle the gameState coming from <Game />
  useEffect(() => {
    switch (gameState) {
      case gameMode.start:
        setTimerOn(false);
        setTimeRemaining(timeLimit);
        break;
      case gameMode.playing:
        setTimerOn(true);
        break;
      case gameMode.over:
        setTimerOn(false);
        dispatch(setWinningTime(timeLimit - timeRemaining));
        break;
      default:
        return;
    }
  }, [gameState, timeLimit, timeRemaining]);

  // handle out of time event
  useEffect(() => {
    if (timeRemaining <= 0) {
      setTimerOn(false);
      dispatch(endGame());
    }
  }, [timeRemaining]);

  return (
    <div className={`${timerOn ? 'pulse' : ''} bg-sky-600 rounded-[50%] h-16 w-32 flex justify-center items-center will-change-transform`}>
      <div className='text-white text-xl font-semibold flex ml-2 h-16 items-center'>
        <div className='min-w-fit w-8'>{('0' + Math.floor((timeRemaining / 60000) % 60)).slice(-2)}:</div>
        <div className='min-w-fit w-8'>{('0' + Math.floor((timeRemaining / 1000) % 60)).slice(-2)}:</div>
        <div className='min-w-fit w-8'>{('0' + ((timeRemaining / 10) % 100)).slice(-2)}</div>
      </div>
    </div>
  );
}
