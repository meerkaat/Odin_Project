function add7(a: number): number {
  return a + 7;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function capitalize(word: string): string {
  let firstLetterCap: string = word[0].toUpperCase() + word.substring(1);
  return firstLetterCap; 
}

function lastLetter(word: string): string {
  return word.slice(-1);
}

console.log(lastLetter("hello"));