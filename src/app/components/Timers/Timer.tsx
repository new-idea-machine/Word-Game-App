import Countdown from 'react-countdown';

interface Props {
  interval: number
}

interface Times {
  minutes: number
  seconds: number
  completed: boolean
}

export default function Timer({ interval }: Props) {

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }: Times) => {
    return (
      <section className='flex flex-col items-start'>
        <div className="pulse flex justify-center items-center will-change-transform">
          {completed
            ? <span>Time Up!</span>
            : <span className='text-white'>{minutes}m {(seconds + "").padStart(2, "0")}s</span>
          }
        </div>
      </section>
    );
  };

  return (
    <Countdown
      date={Date.now() + interval}
      renderer={renderer}
    />
  );
}
