import OpenAI from "openai";

const getFirstWord = function(words: string[]) {
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return [words[randomWordIndex]];
};

const createSequence = function(sequence: string[], wordList: string[], puzzleLength: number, forbiddenIndex: number): any {
  const puzzle = [...sequence];
  const currentWord: string = sequence[sequence.length - 1];
  const wordLength = currentWord.length;
  if (puzzle.length >= puzzleLength) {
    return [...puzzle];
  }

  const allPossibles: { word: string, index: number; }[] = [];

  for (let i = 1; i < wordLength - 1; i++) {
    if (i === forbiddenIndex) {
      // Do not repeat last-used index
      continue;
    }
    // Try to find possibles from just indexes 1, 2, & 3
    const possibles = wordList.filter(word => {
      return word.slice(0, i) === currentWord.slice(0, i)
        && word.slice(i + 1, wordLength) === currentWord.slice(i + 1, wordLength)
        && word !== currentWord
        && !sequence.includes(word);
    });
    allPossibles.push(...possibles.map(word => { return { word, index: i }; }));
  }

  if (!allPossibles.length) {
    for (let i = 0; i < wordLength; i++) {
      if (i === forbiddenIndex) {
        // Do not repeat last-used index
        continue;
      }
      // Try to find possibles from just indexes 1, 2, & 3
      const possibles = wordList.filter(word => {
        return word.slice(0, i) === currentWord.slice(0, i)
          && word.slice(i + 1, wordLength) === currentWord.slice(i + 1, wordLength)
          && word !== currentWord
          && !sequence.includes(word);
      });
      allPossibles.push(...possibles.map(word => { return { word, index: i }; }));
    }
  }

  if (!allPossibles.length) {
    return createSequence(getFirstWord(wordList), wordList, puzzleLength, -1);
  }

  const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];

  forbiddenIndex = chosenWord.index;
  puzzle.push(chosenWord.word);

  return createSequence(puzzle, wordList, puzzleLength, forbiddenIndex);

};

export const getPuzzle = async function(wordList: string[]) {
  const sequence = createSequence(getFirstWord(wordList), wordList, 5, -1);
  //Non-AI way
  // const puzzle = await Promise.all(
  //   sequence.map(async (word: string, id: number) => {

  //     const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
  //       headers: { 'X-Api-Key': '+J71cPB9FYuOr+hgjXPHAA==x1N63HIhndpoopFx' }
  //     });
  //     const data = await response.json();
  //     const possibleClues = data.synonyms.filter((synonym: string) => !synonym.includes(word));

  //     const clue: string = possibleClues.length ? possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim() : "No clue provided";
  //     const extraHint: string = possibleClues.length ? possibleClues.splice(Math.floor(Math.random() * possibleClues.length), 1)[0].trim() : "No clue provided";

  //     return {
  //       id,
  //       word,
  //       clue,
  //       extraHint
  //     };
  //   })
  // );

  //AI way
  /*
    If you obtain an OpenAI key, create a .env.local file in the root directory
    Add NEXT_PUBLIC_OPENAI_API_KEY="Your API key"
    Add .env to your gitignore
  */
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "JSON object with an array of words, where the key is each of the words provided." },
      { role: "user", content: `Generate 10 short clues for each of these words: ${sequence}` }
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" }
  });
  const content = response.choices[0].message.content || "{}";

  const data = JSON.parse(content);

  const puzzle = Object.keys(data).map((word: string) => {

    const possibleClues = data[word].filter((clue: string) => !clue.includes(word));

    const possibleCluesFormatted = possibleClues.join(":");

    return {
      word,
      hints: possibleCluesFormatted
    };
  });
  return puzzle;
};
