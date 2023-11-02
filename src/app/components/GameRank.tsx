import React from 'react';

interface Props {
  hintsUsed: number;
  retries: number;
  winningTime: number;
}

export default function GameRank({ hintsUsed, retries, winningTime }: Props) {
  const oneStar = 1;
  const twoStar = 2;
  const threeStar = 3;

  const renderStars = (rank: number) => {
    const stars = Array(rank).fill('⭐'); // Llenar un array con estrellas
    return stars.map((star, index) => <span key={index} className="star">{star}</span>);
  };

  const getGameRank = () => {
    if (retries === 0 && winningTime <= 60000 && hintsUsed === 0) {
      return (
        <div>
        <h3 className="text-center font-bold mt-2">RANK</h3>
          <p className="text-center">{renderStars(threeStar)}</p>
        </div>
      );
    } else if (retries === 1 || winningTime <= 120000 || hintsUsed === 1) {
      return (
        <div>
            <h3 className="text-center font-bold mt-2">RANK</h3>
          <p className="text-center">{renderStars(twoStar)}</p>
        </div>
      );
    } else if (retries === 2 || winningTime <= 200000 || hintsUsed === 2) {
      return (
        <div>
        <h3 className="text-center font-bold mt-2">RANK</h3>
          <p className="text-center">{renderStars(oneStar)}</p>
        </div>
      );
    }

    return (
      <div>
         <h3 className="text-center font-bold mt-2">RANK</h3>
        <p>{renderStars(oneStar)}</p>
      </div>
    );
  };

  return <div>{getGameRank()}</div>;
}

  