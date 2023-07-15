type PRS = "paper" | "rock" | "scissors";

const choices = [
  "rock",
  "paper",
  "scissors",
] as const satisfies readonly [PRS, PRS, PRS]; // tuple ---- Array = string[] / Array<string>

function getRandomElement<ElementType>(
  array: readonly ElementType[],
): ElementType {
  const min = 0;
  const max = array.length - 1;
  const index = Math.floor(Math.random() * (max - min + 1) + min);
  return array[index]!;
}

const getComputerChoice = (): PRS => getRandomElement(choices);

// user is input/button string of "paper, rock, or scissors" --> 0, 1, 2

type ValidIndex = 0 | 1 | 2;

// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
function isValidIndex(num: number): num is ValidIndex {
  return num === 0 || num === 1 || num === 2;
}

const getUserChoice = (num: number): PRS => {
  // if (num !== 0 && num !== 1 && num !== 2) {
  // if (!(num === 0 || num === 1 || num === 2)) {
  if (!isValidIndex(num)) throw new Error("Expected int 0, 1, 2");
  return choices[num];
};

const Verdict = {
  Computer: "Computer",
  Tie: "Tie",
  User: "User",
} as const;

type Verdict = typeof Verdict[keyof typeof Verdict];

function evaluateGame(uc: PRS, cc: PRS): Verdict {
  if (uc === cc) return "Tie";
  if (uc === "rock") return cc === "paper" ? Verdict.Computer : Verdict.User;
  if (uc === "paper") return cc === "scissors" ? Verdict.Computer : Verdict.User;
  // Ok, then `uc` has to be `"scissors"`:
  return cc === "rock" ? Verdict.Computer : Verdict.User;
}

const getGood = (): Verdict => {
  const score: Record<Verdict, number> = {
    Computer: 0,
    User: 0,
    Tie: 0,
  };

  let rounds = 0;

  while (rounds < 3) {
    // TODO: Let user choose
    let uc = getComputerChoice();
    let cc = getComputerChoice();
    const verdict = evaluateGame(uc, cc);
    // You can index an object using dot notation (obj.prop)
    // or bracket notation (obj["prop"])
    score[verdict] += 1;
    rounds++;
  }

  return score.Computer > score.User ? "Computer"
    : score.User > score.Computer ? "User"
    : "Tie";
}

console.log(getGood());

// const userResult = getUserChoice(1);
// const computerResult = getComputerChoice();
// const winner = evaluateWinner(userResult, computerResult);
// console.log("Computer: " + computerResult);
// console.log("User: " + userResult);
// console.log(winner);

// Simulate multiple games:
for (let i = 0; i < 30; i += 1) {
  console.log(getGood());
}



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
