import { Birthstone_Bounce } from "next/font/google";
import { useAppSelector } from "../redux/store";
import html2canvas from "html2canvas";

export default function GameResults() {
  const {
    retries,
    maxRetries,
    extraHints,
    maxExtraHints,
    winningTime,
    timeLimit,
  } = useAppSelector((state) => state.gameReducer.value);
  const hintsUsed = maxExtraHints - extraHints;

  const timePlayed =
    winningTime === -1 || winningTime === null ? timeLimit : winningTime;

  const minutes = Math.floor((timePlayed / 1000 / 60) % 60);
  const seconds = Math.floor((timePlayed / 1000) % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  let resultImage;

  const saveAsImage = () => {
    const resultTable = document.getElementById("result");
    const downloadButton = document.getElementById("download");
    console.log(resultTable);
    if (resultTable && downloadButton) {
      html2canvas(resultTable).then((canvas) => {
        resultImage = canvas;
        const imageData = resultImage.toDataURL("image/png")
        const newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
        downloadButton.setAttribute('href', newData)
        downloadButton.setAttribute('download', 'result.png')
        downloadButton.click()
      });
    }
  };

  // TODO: Implement sharing function based on this module

  return (
    <section className="w-full flex flex-col content-center">
      <table id="result" className="border border-slate-300">
        <thead>
          <tr>
            {["Time Played", "Wrong Guesses", "Extra Hints"].map((label) => {
              return (
                <th
                  key={label}
                  className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 text-black"
                >
                  {label}
                </th>
              );
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
      <a className="bg-white w-1/5 h-12 mt-2 self-center justify-center content-center" id="download" download={resultImage}>
        <button
          onClick={saveAsImage}
          
        >
          Save Result
        </button>
      </a>
    </section>
  );
}
