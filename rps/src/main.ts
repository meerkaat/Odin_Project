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

let counter: number = 1;
let roundResultsArr: EmojiOptions[] = [];

function displayRoundResults(verdict: Verdict) {
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
      element.textContent = `Round ${counter}: ${result}`;
      roundResultsArr.push(result);
    } else {
      tieBreaker.textContent = `Tie Breaker: ${result}`;
      roundResultsArr.push(result);
    }

  }
  counter++;
}

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

  let tieArr: Verdict[] = [];

  btns().forEach((btn) => {
    btn.addEventListener("click", (ev) => {
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

      displayRoundResults(verdict);
      evaluateOverallWinner();

      comChoice.textContent = emojiMapping[cc];
    });
  });
}
main();
