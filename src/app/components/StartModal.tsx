import { useEffect, useState } from "react";

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
        <div className="bg-sky-50 bg-opacity-80 fixed inset-0 z-50">
          <div className="flex h-screen justify-center items-center">
            <div className="mx-5 flex-col justify-center fixed top-20 bg-white py-7 px-7 rounded-xl shadow-2xl shadow-gray-800">
              <div className="flex justify-center text-3xl font-bold text-black mb-10">Letter Ladder</div>
              <div className="flex-row justify-center text-base text-gray-500 mb-10">
                How to play:
                <div>
                  <p>• Play daily to guess words based on hints</p>
                  <p>• Start with two letters revealed for the first word</p>
                  <p>• Change one letter from the previous word to guess the next word</p>
                </div>
              </div>
              <div className="flex justify-center text-lg text-gray-800 mb-8">Are you ready to play?</div>
              <div className="flex justify-center ">
                <button onClick={handleStartClick} className=" rounded-full px-8 py-2 text-white bg-green-700">Start</button>
              </div>
            </div>
          </div>
        </div>}
    </>
  );

}