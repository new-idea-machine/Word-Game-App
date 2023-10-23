export function randomLetters(wordLength: number) {
  const indices = [];

  while (indices.length < 2) {

    const index = Math.floor(Math.random() * wordLength);
    if (indices.indexOf(index) === -1) {
      indices.push(index);
    }
  }
  return indices;
};