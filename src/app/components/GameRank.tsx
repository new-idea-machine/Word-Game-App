"use client";

import classnames from 'classnames';
import { useState } from 'react';

interface Props {
  hintsUsed: number;
  maxHints: number;
  retriesLeft: number;
  maxRetries: number;
  winningTime: number;
}

export default function GameRank({ hintsUsed, maxHints, retriesLeft, maxRetries, winningTime }: Props) {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const starClass = classnames(
    "star",
    {
      "revealStar": imagesLoaded
    }
  )

  const maxStars = 3; ///Number of stars, in case we decide to change it

  /// Get rank based on percentage, with minimum being 1 and maximum being maxStars  
  const percentRank = function(criteria: number, maxCriteria: number) {
    const percent = criteria / maxCriteria;

    return Math.max(1, Math.floor(percent * maxStars));
  };

  const calculateRank = function() {

    if (winningTime === -1 || retriesLeft <= 0) {
      return 0;
    }

    const timeInSeconds = winningTime / 1000;
    const timeRank = maxStars - Number(timeInSeconds > 30) - Number(timeInSeconds > 60); // Under 30 seconds: 3 stars, under 60 seconds: 2 stars, otherwise 1

    const retriesRank = percentRank(retriesLeft, maxRetries);
    const hintsRank = percentRank(hintsUsed, maxHints);

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
