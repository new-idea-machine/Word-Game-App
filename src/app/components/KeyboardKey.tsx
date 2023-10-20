'use client';

import { MouseEventHandler } from "react";

interface KeyProps {
  character: string,
  onClick: MouseEventHandler
}

export default function KeyboardKey({ character, onClick }: KeyProps) {
  return (
    <button
      className='min-w-fit px-1 w-10 h-10 m-0.5 bg-blue-300 text-cyan-950 capitalize font-semibold rounded-md hover:bg-blue-200 active:bg-blue-400 active:mt-1 active:mb-0 transition'
      onClick={onClick}
    >{character}</button>
  );
}