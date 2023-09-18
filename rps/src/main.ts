import {
  choices,
  emojiMapping,
  EmojiOptions,
  evaluateGame,
  getComputerChoice,
  getRandomElement,
  isValidChoice,
  PRS,
  Verdict,
} from "./prs.js";

import { assert } from "./assert.js";

//*------------------------------------------------------------------------------------------------*/

function getElementByIdOrThrow<T extends HTMLElement = HTMLElement>(
  selector: string,
  msg = "Element not found",
): T {
  const element = document.getElementById(selector);
  if (!element) throw new Error(msg);
  return element as T;
}


const comChoice = getElementByIdOrThrow<HTMLSpanElement>("com-choice");
const round1 = getElementByIdOrThrow<HTMLParagraphElement>("round1");
const round2 = getElementByIdOrThrow<HTMLParagraphElement>("round2");
const round3 = getElementByIdOrThrow<HTMLParagraphElement>("round3");
const tieBreaker = getElementByIdOrThrow<HTMLParagraphElement>("tie-breaker");
const match = getElementByIdOrThrow<HTMLParagraphElement>("match-result");
const resetbtn = getElementByIdOrThrow<HTMLButtonElement>("reset");

resetbtn.disabled = true;
resetbtn.addEventListener("click", () => {
  location.reload();
})


function btns(): HTMLButtonElement[] {
  let buttons: HTMLButtonElement[] = [];
  for (const prs of choices) {
    buttons.push(
      getElementByIdOrThrow<HTMLButtonElement>(`btn-${prs}`),
    );
  }
  return buttons;
};


const btnsArr: HTMLButtonElement[] = btns();

function disableBtns(buttons: HTMLButtonElement[]) {
  for (const btn of buttons) {
    btn.disabled = true;
  }
}

//*------------------------------------------------------------------------------------------------*/

function changeOutlineColorViaVerdict(verdict: Verdict, element: HTMLElement): void {
  const roundsBox = document.querySelectorAll(".box");
  

  for (let i = 0; i < roundsBox.length; i++) {
    verdict === "User"
      ? roundsBox[i].style = "5px solid green"
      : roundsBox[i].style.outline = "5px solid red";
    if (verdict === "Tie") roundsBox[i].style.outline = "5px solid orange";
  }

  
    // verdict === "User"
    //   ? element.style.outline = "5px solid green"
    //   : element.style.outline = "5px solid red";
    // if (verdict === "Tie") element.style.outline = "5px solid orange";
  

}

let counter: number = 1;
let roundResultsArr: EmojiOptions[] = [];

function displayRoundResults(verdict: Verdict, uc: PRS, cc: PRS) {
  const elements: Record<number, HTMLElement> = {
    1: round1,
    2: round2,
    3: round3,
    4: tieBreaker,
  };

  if (counter in elements) { // if "counter" is a key in the "elements" object...
    const element = elements[counter]!;
    let result = emojiMapping[verdict];
    if (counter <= 3) {
      element.textContent = emojiMapping[uc];
      changeOutlineColorViaVerdict(verdict, element);
      roundResultsArr.push(result);
    } else {
      tieBreaker.textContent = emojiMapping[uc];
      changeOutlineColorViaVerdict(verdict, element);
      roundResultsArr.push(result);
    }
  }
  counter++;
}

// why did I need to delete this variable for the DOM to react correctly? 
// It would not cycle emjois in `round1` if I only deleted the `test div` 
// in the HTML. 
// const test = getElementByIdOrThrow<HTMLParagraphElement>("test");

// for (const item of [
//       emojiMapping.paper,
//       emojiMapping.rock,
//       emojiMapping.scissors,
//     ]) {
//       test.textContent = item;
//     }

// function cycleEmjois(condition: boolean): void {
//   const emjois: EmojiOptions[] = [
//     emojiMapping.paper,
//     emojiMapping.rock,
//     emojiMapping.scissors,
//   ];

//   let count = 0;
//   let interval = setInterval(() => {

//     if (!condition) clearInterval(interval);
//   // How to not use `as string`
//   // Why does TS yell here but not in the main function? 
//     round1.textContent = emjois[count];
//     count = (count + 1) % emjois.length;
//   }, 500)
// }

function evaluateOverallWinner() {
  const counts = new Map<EmojiOptions, number>();

  for (const value of roundResultsArr) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
    counts.delete(emojiMapping.Tie);
  }

  for (const [emoji, count] of counts.entries()) {
    // count does not need to diable buttons if verdict is tie.
    if (count > 1) {
      match.textContent = `Match: ${emoji}`;
      disableBtns(btnsArr);
      resetbtn.disabled = false;
      break;
    }
  }
}

function forceNoTie(cc: PRS): PRS {
  let tempChoices = choices.filter((value) => value !== cc);
  let newCC = getRandomElement(tempChoices);
  return newCC;
}

//*------------------------------------------------------------------------------------------------*/

function main() {
  let condition = true;

  const emjois = [
    emojiMapping.paper,
    emojiMapping.rock,
    emojiMapping.scissors,
  ];

  let count = 0;
  // let interval = setInterval(() => {

  //   if (!condition) clearInterval(interval);

  //   round1.textContent = `Round 1: ${emjois[count]}`;
  //   count = (count + 1) % emjois.length;
  // }, 500)


  let tieArr: Verdict[] = [];

  btns().forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      condition = false;

      console.log("Second", tieArr);
      const uc = btn.getAttribute("data-choice");
      let cc = getComputerChoice();

      assert(
        typeof uc === "string" && isValidChoice(uc),
        "Not a valid choice",
      );

      let verdict = evaluateGame(uc, cc);

      if (verdict === Verdict.Tie) {
        tieArr.push(verdict);

        if (tieArr.length > 1) {
          cc = forceNoTie(cc);
          verdict = evaluateGame(uc, cc);
        }
      }

      displayRoundResults(verdict, uc, cc);
      evaluateOverallWinner();

      comChoice.textContent = emojiMapping[cc];
    });
  });
}
main();
