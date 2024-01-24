import { useAppSelector } from "@/app/redux/store";
import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const limit = useAppSelector(state => state.gameReducer.value.timeLimit);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | undefined = undefined;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    // Out of time condition
    if (time === limit) {
      setTimerOn(false);
      setGameOver(true);
    }

    return () => clearInterval(interval);
  }, [limit, time, timerOn]);

  
  const handleReset = function() {
    setTime(0);
    setGameOver(false);
  };

  return (
    <section className='flex flex-col items-start'>
      <div className="pulse flex justify-center items-center will-change-transform">
        <div className='text-white flex ml-2'>
          <div>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</div>
          <div>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</div>
          <div className=' min-w-fit w-8'>{("0" + ((time / 10) % 100)).slice(-2)}</div>
        </div>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Start</button>
        )}
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
        {!timerOn && time > 0 && (
          <button onClick={handleReset}>Reset</button>
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Resume</button>
        )}
      </div>
      {gameOver && (
        <p>Game Over!</p>
      )}
    </section>
  );
}

