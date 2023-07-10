function computerChoice(): number {
  const min: number = Math.ceil(0);
  const max: number = Math.floor(2);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* 
0 = rock
1 = paper
2 = scissors
*/
function numToChoice(num: number) {
  switch (num) {
    case 0: 
      return "rock";
    case 1: 
      return "paper";
    case 2: 
      return "scissors";
  }
};

const computerC: number = computerChoice();
console.log(computerC);
console.log(numToChoice(computerC));