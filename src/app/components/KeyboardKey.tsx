'use client';

import { MouseEventHandler } from "react";

interface KeyProps {
  character: string,
  onClick: MouseEventHandler
}

export default function KeyboardKey({ character, onClick }: KeyProps) {
  return (
    <button
      className='min-w-fit px-1 w-12 h-12 m-0.5 bg-keyboard-key text-keyboard-letter capitalize font-semibold rounded-md hover:bg-keyboard-hover active:bg-keyboard-press active:mt-1 active:mb-0 transition'
      onClick={onClick}
    >{character}</button>
  );
}