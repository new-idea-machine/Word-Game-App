import Countdown from 'react-countdown';

interface Props {
  interval: number;
  countDirection: 'up' | 'down';
}

interface Times {
  minutes: number;
  seconds: number;
  completed: boolean
}

// Random component
const Completionist = () => <span>Time&apos;s Up!</span>;

export default function GameTimer({ interval, countDirection }: Props) {

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Times) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <section className='relative flex flex-col items-start'>
          <div className="pulse" />
          <span className='absolute left-11 top-7 text-white'>{minutes}m {(seconds + "").padStart(2, "0")}s</span>
        </section>
      );
    }
  };

  return (
    <div>
      <p>GameTimer: counting {countDirection}</p>
      <Countdown
        date={Date.now() + interval}
        renderer={renderer}
      />
    </div>
  );
}
