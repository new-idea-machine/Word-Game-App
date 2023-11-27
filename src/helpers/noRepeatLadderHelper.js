import wordList from '../_data/wordList';

export default function getNoRepeatLadder() {
  const nbWords = wordList.length;
  const process = [];
  let forbiddenIndex = -1;

  const getFirstWord = function() {
    const randomWordIndex = Math.floor(Math.random() * nbWords);
    process.push(`First word: ${wordList[randomWordIndex].toUpperCase()}`);
    forbiddenIndex = -1;
    return wordList[randomWordIndex];
  };

  const addWord = function(currentWord) {
    let allPossibles = [];

    for (let i = 0; i < 5; i++) {
      if (i === forbiddenIndex) {
        // Do not repeat last-used index
        continue;
      }
      const possibles = wordList.filter((word) => {
        return word.slice(0, i) === currentWord.slice(0, i)
            && word.slice(i + 1, 5) === currentWord.slice(i + 1, 5)
            && word !== currentWord
            && !ladder.includes(word);
      });

      if (possibles.length > 0) {
        process.push(`Letter ${i + 1} possibles: ${possibles.join(', ')}`);
        const possibleWithIndex = possibles.map(word => {
          return { word: word, index: i };
        });

        allPossibles = allPossibles.concat(possibleWithIndex);
      }
    } // end of for loop

    // If no possible next word could be found, return false
    if (allPossibles.length === 0) {
      process.push(`${currentWord.toUpperCase()} killed the ladder :(`);
      return false;
    }

    // Choose next word at random from all possible array
    // allPossibles is an arrays of objects { word: word, index: i }
    const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];

    // process.push(`Possible evolutions: ${allPossibles.join(', ')}`);
    process.push(`Chosen word: ${chosenWord.word.toUpperCase()}, letter ${chosenWord.index + 1}`);
    forbiddenIndex = chosenWord.index;
    return chosenWord.word;
  };

  // add first word to ladder
  let ladder = [getFirstWord()];

  while (ladder.length < 5) {
    // Try to get the next word
    const nextWord = addWord(ladder[ladder.length - 1]);
    if (nextWord) {
      // Next word found, add to ladder
      ladder.push(nextWord);
    } else {
      // No word found, start again
      ladder = [getFirstWord()];
    }
  }
  return { nbWords, ladder, process };
}