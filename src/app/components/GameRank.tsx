"use client";

import classnames from 'classnames';
import { useState } from 'react';
import { useAppSelector } from '../redux/store';

export default function GameRank() {

  const { retries, maxRetries, extraHints, maxExtraHints, timeLimit, winningTime } = useAppSelector(state => state.gameReducer.value);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const starClass = classnames(
    "star",
    {
      "revealStar": imagesLoaded
    }
  );

  const maxStars = 3; ///Number of stars, in case we decide to change it

  /// Get rank based on percentage, with minimum being 1 and maximum being maxStars  
  const percentRank = function(criteria: number, maxCriteria: number) {
    const percent = criteria / maxCriteria;

    return Math.max(1, Math.floor(percent * maxStars));
  };

  const calculateRank = function() {

    if (winningTime === -1 || retries <= 0) {
      return 0;
    }

    const timeInSeconds = winningTime / 1000;
    const timeRank = maxStars - Number(timeInSeconds > 30) - Number(timeInSeconds > 60); // Under 30 seconds: 3 stars, under 60 seconds: 2 stars, otherwise 1

    const retriesRank = percentRank(retries, maxRetries);
    const hintsRank = percentRank(extraHints, maxExtraHints);

    return Math.floor((timeRank + retriesRank + hintsRank) / maxStars);
  };

  const rank = calculateRank();

  const stars = Array(maxStars).fill("/star-empty.svg").fill("/star-filled.svg", 0, rank);

  const renderedStars = stars.map((star, index) => {
    return <img key={`star${index}`} className={starClass} alt="Star rank" src={star} loading='eager' onLoad={() => setImagesLoaded(true)} />;
  });

  return (
    <div className='flex justify-center'>
      {renderedStars}
    </div>
  );
};
