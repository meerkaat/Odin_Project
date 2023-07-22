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
  if (uc === "paper") {
    return cc === "scissors"
      ? Verdict.Computer
      : Verdict.User;
  }
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

  return score.Computer > score.User
    ? "Computer"
    : score.User > score.Computer
    ? "User"
    : "Tie";
};

console.log(getGood());

// const userCol = document.getElementById('user-col-one');
// if (!userCol) throw new Error("Error: userCol null");
function getElementByIdOrThrow<T extends HTMLElement = HTMLElement>(
  selector: string,
  msg = "Element not found",
): T {
  const element = document.getElementById(selector);
  if (!element) throw new Error(msg);
  return element as T;
}

const userCol = getElementByIdOrThrow<HTMLDivElement>("user-row-one");
let userColPos = userCol.getBoundingClientRect();
const userCol2 = getElementByIdOrThrow<HTMLDivElement>("user-row-two");
let userColPos2 = userCol2.getBoundingClientRect();
const roundSelector = getElementByIdOrThrow<HTMLDivElement>("round-selector");

const btn = getElementByIdOrThrow<HTMLButtonElement>("btn");

btn.addEventListener("click", (e) => {
  
  userCol2.append(roundSelector);
  // roundSelector.style.transitionDuration = "50s";
  roundSelector.style.backgroundColor = "black";
})

// window.addEventListener("load", (e) => {
//   for (const key of ["top", "right", "bottom", "left", "width", "height"] as const) {
//     roundSelector.style[key] = String(userColPos[key] + "px");
//   }
// });

// btn.addEventListener("click", (e) => {
//   for (const key of ["top", "right", "bottom", "left", "width", "height"] as const) {
//     roundSelector.style[key] = String(userColPos2[key] + "px");
//   }
// });

console.log(userColPos);

// const emojiBtn = Array.from(document.getElementsByClassName('btn'));
// const rowBackground = document.getElementById('round-selector') as HTMLDivElement;
// let nextPos = document.getElementById('row-one') as HTMLDivElement;
// let rowBackgroundPos = nextPos.getBoundingClientRect() as DOMRect;
// let test = document.createElement('button');
// document.body.style.backgroundColor = "black";
// emojiBtn.forEach(btn => {
//   btn.addEventListener('onclick', (e) => {
//     let top = rowBackgroundPos.top;
//     let right = rowBackgroundPos.right;
//     let bottom = rowBackgroundPos.bottom;
//     let left = rowBackgroundPos.left;
//     rowBackground.style.top = "top";
//     rowBackground.style.right = "right";
//     rowBackground.style.bottom = "bottom";
//     rowBackground.style.left = "left";
//   }
//   )
// })
// }

// const userResult = getUserChoice(1);
// const computerResult = getComputerChoice();
// const winner = evaluateWinner(userResult, computerResult);
// console.log("Computer: " + computerResult);
// console.log("User: " + userResult);
// console.log(winner);

// Simulate multiple games:
// for (let i = 0; i < 30; i += 1) {
//   console.log(getGood());
// }
