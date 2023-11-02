import { useEffect } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';

interface Props {
  interval: number
  gameState: string
}

interface Times {
  minutes: number
  seconds: number
  completed: boolean
}

export default function Timer({ interval, gameState }: Props) {
  let countdownApi: CountdownApi | null = null;
  let state = { date: Date.now() + interval };

  const handleStartClick = function(): void {
    console.log('called handleStartClick');
    console.log('api there?', countdownApi ? 'true' : 'false');
    countdownApi && countdownApi.start();
  };

  const handlePauseClick = function(): void {
    countdownApi && countdownApi.pause();
  };

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  if (gameState === 'start') {
    console.log('start gameState:', gameState);
  }

  if (gameState === 'playing') {
    console.log('playing gameState:', gameState);
    handleStartClick();
  }

  if (gameState === 'over') {
    console.log('over gameState:', gameState);
  }

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Times) => {
    return (
      <>
        <section className='flex flex-col items-start m-0'>
          <div className="pulse text-xl font-semibold flex justify-center items-center will-change-transform">
            {completed
              ? <span>Time Up!</span>
              : <span className='text-white'>{minutes}m {(seconds + "").padStart(2, "0")}s</span>
            }
          </div>
        </section>
        <div>gamestate:&nbsp;{gameState}<br />
          <button
            type="button"
            onClick={handleStartClick}
          >
            Start
          </button>
          <button
            type="button"
            onClick={handlePauseClick}
          >
            Pause
          </button>
        </div>
      </>
    );
  };

  return (
    <Countdown
      key={state.date}
      date={state.date}
      ref={setRef}
      autoStart={false}
      renderer={renderer}
    />
  );
}
