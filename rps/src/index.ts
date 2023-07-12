const choices: string[] = ["rock", "paper", "scissors"];

const computerChoice = (): string => {
  const min = Math.ceil(0);
  const max = Math.floor(2);
  const randNum = Math.floor(Math.random() * (max - min + 1) + min);
  return choices[randNum];
}

const userChoice = (num: number): string => {
  return choices[num];
}

function evaluateWinner(uc: string, cc: string) {
  if (uc === cc) {
    return "Tie";
  } else if (uc === "rock") {
    return cc === "paper" ? "Computer Wins" : "User Wins";
  } else if (uc === "paper") {
    return cc === "scissors" ? "Computer Wins" : "User Wins";
  } else if (uc === "scissors") {
    return cc === "rock" ? "Computer Wins" : "User Wins";
  }
}

const userResult = userChoice(1);
const computerResult = computerChoice();
const winner = evaluateWinner(userResult, computerResult);
console.log("Computer: " + computerResult);
console.log("User: " + userResult);
console.log(winner);


/* 
0 = rock
1 = paper
2 = scissors
*/
// create generic type for `num` to have a return type for numToChoice
// function numToChoice(num: number) {
//   let choice;
//   switch (num) {
//     case 0: 
//       return "rock";
//     case 1: 
//       return "paper";
//     case 2: 
//       return "scissors";
//   }
// };



/*
---
This is the type vscode gave.―――――――৲
                                     ⤵
---
function numToChoice(num: number): "rock" | "paper" | "scissors" | undefined {
  let choice;
  switch (num) {
    case 0: 
      return "rock";
    case 1: 
      return "paper";
    case 2: 
      return "scissors";
  }
};
*/

/*
function numToChoice(num: number): string {
  let choice;
  switch (num) {
    case 0: 
      let choice: string = "rock";
    case 1: 
      let choice: string = "paper";
    case 2: 
      let choice: string = "scissors";
  }
  return choice; 
};
*/

/*
function numToChoice(num: number): string {
  let choice;
  switch (num) {
    case 0: {
      let choice: string = "rock";
      break;
    }
    case 1: {
      let choice: string = "paper";
      break;
    }
    case 2: {
      let choice: string = "scissors";
      break;
    }
  }
  return choice; 
};
*/