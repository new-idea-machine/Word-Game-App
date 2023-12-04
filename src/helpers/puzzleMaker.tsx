import OpenAI from "openai";

const formatQueryWordObject = function(id: number, word: string, hintsString: string) {
  if (!hintsString) {
    return { word, hints: [] } as WordObject;
  }
  return { word, hints: hintsString.split(':') } as WordObject;
};

const getFirstWord = function(wordList: WordQueryObject[]) {
  const randomWordIndex = Math.floor(Math.random() * wordList.length);
  const { id, word, hints } = wordList[randomWordIndex];
  return [formatQueryWordObject(id, word, hints)];
};

const filterWords = function(wordList: WordQueryObject[], sequence: WordObject[], startIndex: number, endIndex: number, forbidden: number) {
  const sequenceWords = sequence.map(item => item.word);
  const word = sequenceWords[sequenceWords.length - 1];
  const wordLength = word.length;
  const possibleWords = [];

  for (let i = startIndex; i < endIndex; i++) {
    if (i === forbidden) {
      // Do not repeat last-used index
      continue;
    }
    // Try to find possibles from just indexes 1, 2, & 3
    const possibles = wordList.filter(wordItem => {
      const listWord = wordItem.word;
      return listWord.slice(0, i) === word.slice(0, i)
        && listWord.slice(i + 1, wordLength) === word.slice(i + 1, wordLength)
        && listWord !== word
        && !sequenceWords.includes(listWord);
    });
    possibleWords.push(...possibles.map(wordItem => {
      const { id, word, hints } = wordItem;
      const formattedWord = formatQueryWordObject(id, word, hints) as WordObject;
      return { formattedWord, index: i };
    }));
  }

  return possibleWords;
};

const createSequence = function(sequence: WordObject[], wordList: WordQueryObject[], puzzleLength: number, forbiddenIndex: number): any {
  const puzzle = [...sequence];
  const currentWord: WordObject = sequence[sequence.length - 1];
  const wordLength = currentWord.word.length;

  if (puzzle.length >= puzzleLength) {
    return [...puzzle];
  }

  const allPossibles: { formattedWord: WordObject, index: number; }[] = [];

  // for (let i = 1; i < wordLength - 1; i++) {
  //   if (i === forbiddenIndex) {
  //     // Do not repeat last-used index
  //     continue;
  //   }
  //   // Try to find possibles from just indexes 1, 2, & 3
  //   const possibles = wordList.filter(wordItem => {
  //     return word.slice(0, i) === currentWord.slice(0, i)
  //       && word.slice(i + 1, wordLength) === currentWord.slice(i + 1, wordLength)
  //       && word !== currentWord
  //       && !sequence.includes(word);
  //   });
  //   allPossibles.push(...possibles.map(word => { return { word, index: i }; }));
  // }

  allPossibles.push(...filterWords(wordList, sequence, 1, wordLength - 1, forbiddenIndex));

  if (!allPossibles.length) {
    allPossibles.push(...filterWords(wordList, sequence, 0, wordLength, forbiddenIndex));
  }

  if (!allPossibles.length) {
    return createSequence(getFirstWord(wordList), wordList, puzzleLength, -1);
  }

  const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];

  forbiddenIndex = chosenWord.index;
  puzzle.push(chosenWord.formattedWord);

  return createSequence(puzzle, wordList, puzzleLength, forbiddenIndex);

};

export const getPuzzle = async function(wordList: WordQueryObject[]) {
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
  const cluelessWords = sequence.filter((wordItem: WordObject) => {
    if (wordItem.hints.length < 2) {
      return true;
    }
  }).map((wordItem: WordObject) => {
    return wordItem.word;
  });

  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "JSON object with an array of words, where the key is each of the words provided." },
      { role: "user", content: `Generate 5 short clues for each of these words: ${cluelessWords}` }
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" }
  });
  const content = response.choices[0].message.content || "{}";

  const data = JSON.parse(content);

  const puzzle = sequence.map((wordItem: WordObject) => {
    const possibleHints = wordItem.hints;
    if (!possibleHints.length) {
      const filteredHints = data[wordItem.word].filter((clue: string) => !clue.includes(wordItem.word));
      possibleHints.push(...filteredHints);
    }

    return {
      word: wordItem.word,
      hints: possibleHints
    } as WordObject;
  });

  return puzzle;
};
