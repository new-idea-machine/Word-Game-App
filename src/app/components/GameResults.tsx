import { useAppSelector } from "../redux/store";
import html2canvas from 'html2canvas';

export default function GameResults() {

  const { retries, maxRetries, extraHints, maxExtraHints, winningTime, timeLimit } = useAppSelector(state => state.gameReducer.value);
  const hintsUsed = maxExtraHints - extraHints;

  const timePlayed = (winningTime === -1 || winningTime === null) ? timeLimit : winningTime;

  const minutes = Math.floor((timePlayed / 1000 / 60) % 60);
  const seconds = Math.floor((timePlayed / 1000) % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // TODO: Implement sharing function based on this module

  return (
    <section className="w-full flex flex-col content-center">
      <table className="border border-slate-300">
        <thead>
          <tr>
            {["Time Played", "Wrong Guesses", "Extra Hints"].map(label => {
              return <th key={label} className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 text-black">{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
            <td className="border border-slate-300">{formattedTime}</td>
            <td className="border border-slate-300">{maxRetries - retries}</td>
            <td className="border border-slate-300">{hintsUsed}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
