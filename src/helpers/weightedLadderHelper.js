import wordList from '../_data/wordList';

export default function getWeightedLadder() {
  const nbWords = wordList.length;
  const process = [];

  const getFirstWord = function() {
    const randomWordIndex = Math.floor(Math.random() * nbWords);
    process.push(`First word: ${wordList[randomWordIndex].toUpperCase()}`);
    return wordList[randomWordIndex];
  };

  const addWord = function(currentWord) {
    let allPossibles = [];

    // Try to find possibles from just indexes 1, 2, & 3
    for (let i = 1; i < 4; i++) {
      const possibles = wordList.filter(word => {
        return word.slice(0, i) === currentWord.slice(0, i)
          && word.slice(i + 1, 5) === currentWord.slice(i + 1, 5)
          && word !== currentWord
          && !ladder.includes(word);
      });

      if (possibles.length > 0) {
        allPossibles = allPossibles.concat(possibles);
        process.push(`${currentWord}: match found, letter ${i + 1}`);
      }
    } // end of for loop

    // If 1, 2 & 3 return no possibles, try 0 & 4
    if (allPossibles.length === 0) {
      process.push(`${currentWord}: no matches in letters 2, 3 & 4, trying 1 & 5...`);
      for (let i = 0; i < 5; i += 4) {
        const possibles = wordList.filter(word => {
          return word.slice(0, i) === currentWord.slice(0, i)
            && word.slice(i + 1, 5) === currentWord.slice(i + 1, 5)
            && word !== currentWord
            && !ladder.includes(word);
        });
  
        if (possibles.length > 0) {
          allPossibles = allPossibles.concat(possibles);
        }
      } // end of for loop
    }

    // If no possible next word could be found, return false
    if (allPossibles.length === 0) {
      process.push(`${currentWord.toUpperCase()} killed the ladder :(`);
      return false;
    }

    // Choose next word at random from all possible array
    const chosenWord = allPossibles[Math.floor(Math.random() * allPossibles.length)];

    process.push(`Possible evolutions: ${allPossibles.join(', ')}`);
    process.push(`Chosen word: ${chosenWord.toUpperCase()}`);

    return chosenWord;
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