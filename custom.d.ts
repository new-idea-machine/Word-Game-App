export { };

declare global {
  type wordQueryObject = { id: number, word: string, hints: string; };

  type WordObject = { word: string, hints: string[]; };

  type PuzzleObject = {
    id: number;
    word: string;
    clue: string;
    extraHints: string[];
  };
}