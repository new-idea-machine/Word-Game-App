import wordList from '@/wordLists/targetWords';
import Clues from './Clues';

export const getPuzzle = function() {
  const nbWords = wordList.length;
  const process: string[] = [];

  const getFirstWord = function() {
    const randomWordIndex = Math.floor(Math.random() * nbWords);
    process.push(`First word: ${wordList[randomWordIndex].toUpperCase()}`);
    return wordList[randomWordIndex];
  };

  const addWord = function(currentWord: string) {
    let allPossibles: string[] = [];

    for (let i = 0; i < 5; i++) {
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
      // console.log('reset:', ladder[0]);
    }
  }
  return { ladder, process };
};

export default function Home() {
  const { ladder, process } = getPuzzle();

  const puzzle = ladder.map(word => {
    return (
      <li key={word}>
        {word.toUpperCase()}
        <Clues word={word} />
      </li>
    );
  });

  const verbose = process.map(action => {
    return <li key={action}>{action}</li>;
  });

  return (
    <main className="temp">
      <section className="result">
        <h2>Ladder Result:</h2>
        <ul>{puzzle}</ul>
      </section>
      <section className="process">
        <h2>How did we get here?</h2>
        <ul>{verbose}</ul>
        <form action={'/temp'}>
          <button type='submit'>Refresh</button>
        </form>
      </section>
    </main>
  );
}
