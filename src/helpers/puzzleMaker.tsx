import OpenAI from "openai";

const getFirstWord = function(words: string[]) {
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return [words[randomWordIndex]];
};

const createSequence = function(sequence: string[], wordList: string[], puzzleLength: number): any {
  const puzzle = [...sequence];
  const currentWord: string = sequence[sequence.length - 1];

  if (puzzle.length >= puzzleLength) {
    return [...puzzle];
  }

  const allPossibles: string[] = [];

  for (let i = 0; i < puzzleLength; i++) {
    const possibles = wordList.filter(word => {
      return word.slice(0, i) === currentWord.slice(0, i)
        && word.slice(i + 1, 5) === currentWord.slice(i + 1, 5)
        && word !== currentWord
        && !sequence.includes(word);
    });

    if (!possibles.length) {
      return createSequence(getFirstWord(wordList), wordList, puzzleLength);
    }

    allPossibles.push(...possibles);
    const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];

    puzzle.push(chosenWord);

    return createSequence(puzzle, wordList, puzzleLength);

  }
};

export const getPuzzle = async function(wordList: string[]) {
  const sequence = createSequence(getFirstWord(wordList), wordList, 5);

  //Non-AI way
  const puzzle = await Promise.all(
    sequence.map(async (word: string, id: number) => {

      const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
        headers: { 'X-Api-Key': '+J71cPB9FYuOr+hgjXPHAA==x1N63HIhndpoopFx' }
      });
      const data = await response.json();
      const possibleClues = data.synonyms.filter((synonym: string) => !synonym.includes(word));

      const clue: string = possibleClues.length ? possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim() : "No clue provided";
      const extraHint: string = possibleClues.length ? possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim() : "No clue provided";

      return {
        id,
        word,
        clue,
        extraHint
      };
    })
  );

  //AI way
  /*
    If you obtain an OpenAI key, create a .env.local file in the root directory
    Add NEXT_PUBLIC_OPENAI_API_KEY="Your API key"
    Add .env to your gitignore
  */
  // const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  // const response = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "JSON object with an array of words, where the key is each of the words provided." },
  //     { role: "user", content: `Generate 10 words associated with each of these words: ${sequence}` }
  //   ],
  //   model: "gpt-3.5-turbo-1106",
  //   response_format: { type: "json_object" }
  // });
  // const content = response.choices[0].message.content || "{}";
  // const data = JSON.parse(content);

  // const puzzle = Object.keys(data).map((word: string, id: number) => {

  //   const possibleClues = data[word].filter((clue: string) => !clue.includes(word));

  //   const clue: string = possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim();
  //   const extraHint: string = possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim();

  //   return {
  //     id,
  //     word,
  //     clue,
  //     extraHint
  //   };
  // });

  return puzzle;
};
