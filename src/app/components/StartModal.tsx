import Link from "next/link";
import { useEffect, useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";

interface Props {
  onClose: Function;
}

export default function StartModal({ onClose }: Props) {
  const [showModal, setShowModal] = useState(true);

  // Handle start button clicked
  const handleStartClick = () => {
    onClose();
    setShowModal(false);
  };

  //Uncomment when testing to save time
  // useEffect(() => {
  //   handleStartClick();
  // }, []);

  return (
    <>
      {showModal &&
        <div className="bg-background bg-opacity-80 fixed inset-0 z-50 flex justify-center dark:bg-background-dark">
          <div className="mx-5 flex flex-col justify-center fixed gap-8 top-20 bg-white py-7 px-7 rounded-xl shadow-2xl shadow-gray-800 dark:bg-black">
            <DarkModeSwitch />
            <h1 className="flex justify-center text-3xl font-boldmb-10">Letter Ladder</h1>
            <div className="flex-row justify-center text-base text-gray-500">
              How to play:
              <ul className="list-disc pl-4">
                <li>Play daily to guess words based on hints</li>
                <li>Start with two letters revealed for the first word</li>
                <li>Change one letter from the previous word to guess the next word</li>
              </ul>
            </div>
            <footer className="flex flex-col justify-center items-center gap-2 mb-8 text-lg text-gray-800 dark:text-gray-200">
              <h4>Are you ready to play?</h4>
              <button onClick={handleStartClick} className="transition rounded-full px-8 py-2 text-white bg-green-700 hover:bg-green-600 active:bg-green-800">Start</button>
              <div>
                <p className="text-sm"><Link href="/login">Log In or Register</Link> an account to keep track of your stats.</p>
              </div>
            </footer>
          </div>
        </div>}
    </>
  );

}