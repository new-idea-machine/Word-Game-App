import Stopwatch from "./Stopwatch";
import Timer from "./Timer";

interface Props {
  interval: number
  countDirection: 'up' | 'down'
}

export default function GameTimer({ interval, countDirection }: Props) {
  return (
    <div>
      {countDirection === 'down'
        ? <Timer interval={interval} />
        : <Stopwatch limit={interval} />
      }
    </div>
  );
}