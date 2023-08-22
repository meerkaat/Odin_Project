import {
  choices,
  // choiceToEmoji,
  emojiMapping,
  EmojiOptions,
  evaluateGame,
  getComputerChoice,
  isValidChoice,
  Verdict,
} from "./prs.js";

import { assert } from "./assert.js";

function getElementByIdOrThrow<T extends HTMLElement = HTMLElement>(
  selector: string,
  msg = "Element not found",
): T {
  const element = document.getElementById(selector);
  if (!element) throw new Error(msg);
  return element as T;
}

export let counter: number = 1;
let roundResultsArr: EmojiOptions[] = [];

function main() {
  const messageElm = getElementByIdOrThrow<HTMLDivElement>("message");
  const resultElm = getElementByIdOrThrow<HTMLDivElement>("result");
  const comChoice = getElementByIdOrThrow<HTMLSpanElement>("com-choice");

  const round1 = getElementByIdOrThrow<HTMLParagraphElement>("round1");
  const round2 = getElementByIdOrThrow<HTMLParagraphElement>("round2");
  const round3 = getElementByIdOrThrow<HTMLParagraphElement>("round3");

  const match = getElementByIdOrThrow<HTMLParagraphElement>("match-result");

  const btns = function (): HTMLButtonElement[] {
    let buttons: HTMLButtonElement[] = [];
    for (const prs of choices) {
      buttons.push(
        getElementByIdOrThrow<HTMLButtonElement>(`btn-${prs}`),
      );
    }
    return buttons;
  };

  function disableBtns() {
    for (const btn of btns()) {
      btn.disabled = true;
    }
  }

  //*------------------------------------------------------------------------------------------------*/

  function displayRoundResults(verdict: Verdict) {
    const elements: Record<number, HTMLElement> = {
      1: round1,
      2: round2,
      3: round3,
    };

    if (counter in elements) { // if "counter" is a key in the "elements" object...
      const element = elements[counter]!;
      let result = emojiMapping[verdict];
      element.textContent = `Round ${counter}:${result}`;
      roundResultsArr.push(result);
      if (counter === 3) disableBtns();
    }
    counter++;
  }

  function evaluateOverallWinner() {
    const counts = new Map<EmojiOptions, number>();

    for (const value of roundResultsArr) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    for (const [emoji, count] of counts.entries()) {
      if (count > 1) {
        match.textContent = emoji;
        disableBtns();
        break;
      }
      // if countfor all is 1
      // then getComputerChoice() should not choice what the user chose.
    }
  }

  //*------------------------------------------------------------------------------------------------*/

  btns().forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const uc = btn.getAttribute("data-choice");
      let cc = getComputerChoice();

      assert(
        typeof uc === "string" && isValidChoice(uc),
        "Not a valid choice",
      );

      function controlDestiny() {
        if (cc === uc) {
          getComputerChoice();
          controlDestiny();
        } 
        return cc;
      }

    if (counter === 3) controlDestiny();
  
    const verdict = evaluateGame(uc, cc);
    displayRoundResults(verdict);
    evaluateOverallWinner();

    comChoice.textContent = emojiMapping[cc];
    resultElm.textContent = emojiMapping[verdict];
  });
});
}
main();
