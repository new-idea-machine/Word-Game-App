'use client';

interface KeyboardProps {
  keyFunction: Function
}

import KeyboardKey from './KeyboardKey';

export default function VirtualKeyboard({ keyFunction }: KeyboardProps) {

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', -1],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 1]
  ];

  const renderedKeys = keyboardLayout.map((row, index) => {
    const keyboardRow = row.map(c => {
      switch (c) {
        case null:
          return <div key='0' className='w-10 h-10 m-0.5'></div>;
        case -1:
          return <KeyboardKey key='backspace' character='Back' onClick={() => keyFunction('Backspace')} />;
        case 1:
          return <KeyboardKey key='enter' character='Submit' onClick={() => keyFunction('Enter')} />;
        default:
          return <KeyboardKey key={c} character={String(c)} onClick={() => keyFunction(c)} />;
      }
    });

    return <div className='flex justify-center' key={`row${index}`}>{keyboardRow}</div>;

  });

  return (
    <div>
      {renderedKeys}
    </div>
  );
}