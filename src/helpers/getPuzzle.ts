
interface ApiResponse {
  synonyms: string[];
  // Add other properties from the API response if needed
}

const fetch = require('node-fetch');

const getFirstWord = (words: string[]) => {
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return [words[randomWordIndex]];
};

const createSequence = (sequence: string[], wordList: string[], puzzleLength: number): string[] => {
  const puzzle = [...sequence];
  const currentWord = sequence[sequence.length - 1];

  if (puzzle.length >= puzzleLength) {
    return puzzle;
  }

  const allPossibles: string[] = [];

  for (let i = 0; i < currentWord.length; i++) {
    const possibles = wordList.filter(word => {
      return word.slice(0, i) === currentWord.slice(0, i)
        && word.slice(i + 1) === currentWord.slice(i + 1)
        && word !== currentWord
        && !puzzle.includes(word);
    });

    if (possibles.length) {
      allPossibles.push(...possibles);
    }
  }

  if (allPossibles.length) {
    const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];
    puzzle.push(chosenWord);
    return createSequence(puzzle, wordList, puzzleLength);
  }

  // Fallback return to satisfy TypeScript's requirement for a return on every path
  return puzzle;
};


export const getPuzzle = async (wordList: string[]) => {
  const sequence = createSequence(getFirstWord(wordList), wordList, 5);
  const API_KEY = '+J71cPB9FYuOr+hgjXPHAA==x1N63HIhndpoopFx'; // Use environment variable in production

  const puzzle = await Promise.all(
    sequence.map(async (word: string, id: number) => {
      const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
        headers: { 'X-Api-Key': API_KEY }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data for word: ${word}`);
      }

      const data = await response.json() as ApiResponse;
      const possibleClues = data.synonyms.filter((synonym: string) => !synonym.includes(word));

      const clue = possibleClues.length ? possibleClues[Math.floor(Math.random() * possibleClues.length)].trim() : "No clue provided";
      const extraHint = possibleClues.length ? possibleClues[Math.floor(Math.random() * possibleClues.length)].trim() : "No clue provided";

      return {
        id,
        word,
        clue,
        extraHint
      };
    })
  );

  return puzzle;
};
