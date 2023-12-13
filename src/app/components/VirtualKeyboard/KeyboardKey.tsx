'use client';

import { MouseEventHandler } from "react";

interface KeyProps {
  character: string,
  onClick: MouseEventHandler
}

export default function KeyboardKey({ character, onClick }: KeyProps) {
  return (
    <button
      className='transition capitalize font-semibold rounded-md border border-transparent min-w-fit px-1 w-12 h-12 m-0.5 bg-keyboard-key text-keyboard-letter  hover:bg-keyboard-hover active:bg-keyboard-press active:mt-1 active:mb-0 dark:text-keyboard-key dark:bg-keyboard-letter dark:hover:border-keyboard-hover'
      onClick={onClick}
    >{character}</button>
  );
}