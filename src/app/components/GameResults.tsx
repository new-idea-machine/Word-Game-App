import { useAppSelector } from "../redux/store";
import html2canvas from "html2canvas";
import React from "react";

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

    if (resultTable && downloadButton) {
      resultTable.style.visibility = "visible";
      html2canvas(resultTable).then((canvas) => {
        resultImage = canvas;
        const imageData = resultImage.toDataURL("image/png");
        const newData = imageData.replace(
          /^data:image\/png/,
          "data:application/octet-stream"
        );
        resultTable.style.visibility = "hidden";
        downloadButton.setAttribute("href", newData);
        downloadButton.setAttribute("download", "result.png");
        downloadButton.click();
      });
    }
  };

  return (
    <div className="w-full flex flex-col content-center">
      <section className="w-full flex flex-col content-center">
        <table className="border border-slate-300">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800">
              {["Time Played", "Wrong Guesses", "Extra Hints"].map((label) => {
                return (
                  <th
                    key={label}
                    className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 text-black dark:text-white"
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-white hover:!bg-stone-200 dark:bg-black">
              <td className="resulttd border border-slate-300">
                {formattedTime}
              </td>
              <td className="resulttd border border-slate-300">
                {maxRetries - retries}
              </td>
              <td className="resulttd border border-slate-300">{hintsUsed}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className="overflow-hidden relative">
        <section
          id="result"
          className="absolute right-50 top-50 invisible w-full flex flex-col content-center"
        >
          <table className="border border-slate-300">
            <thead>
              <tr className="bg-background">
                {["Time Played", "Wrong Guesses", "Extra Hints"].map(
                  (label) => {
                    return (
                      <th
                        key={label}
                        className="font-bold pb-4 px-4 border-b border-l text-center border-gray-500 text-black"
                      >
                        {label}
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
                <td className="resulttd border border-slate-300 pb-4">
                  {formattedTime}
                </td>
                <td className="resulttd border border-slate-300 pb-4">
                  {maxRetries - retries}
                </td>
                <td className="resulttd border border-slate-300 pb-4">
                  {hintsUsed}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <a
        className="flex bg-white w-1/5 h-8 mt-2 self-center justify-center content-center"
        id="download"
        download={resultImage}
      >
        <button onClick={saveAsImage} className="self-center">
          Save Result
        </button>
      </a>
    </div>
  );
}
