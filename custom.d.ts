export { };

declare global {
  type WordObject = { id: number, word: string, hints: string; };

  type PuzzleObject = {
    id: number;
    word: string;
    clue: string;
    extraHints: string[];
  };
}