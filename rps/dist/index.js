"use strict";
function computerChoice() {
    const min = Math.ceil(0);
    const max = Math.floor(2);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/*
0 = rock
1 = paper
2 = scissors
*/
// create generic type for `num` to have a return type for numToChoice
function numToChoice(num) {
    let choice;
    switch (num) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}
;
const computerC = computerChoice();
console.log(computerC);
console.log(numToChoice(computerC));
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
