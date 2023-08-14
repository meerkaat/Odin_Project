import {
  choices,
  // choiceToEmoji,
  emojiMapping,
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

function main() {

  const messageElm = getElementByIdOrThrow<HTMLDivElement>("message");
  const resultElm = getElementByIdOrThrow<HTMLDivElement>("result");
  const comChoice = getElementByIdOrThrow<HTMLSpanElement>("com-choice");

  const round1 = getElementByIdOrThrow<HTMLParagraphElement>("round1");
  const round2 = getElementByIdOrThrow<HTMLParagraphElement>("round2");
  const round3 = getElementByIdOrThrow<HTMLParagraphElement>("round3");


  // const paperBtn = getElementByIdOrThrow<HTMLButtonElement>("btn-paper");
  // const rockBtn = getElementByIdOrThrow<HTMLButtonElement>("btn-rock");
  // const scissorsBtn = getElementByIdOrThrow<HTMLButtonElement>("btn-scissors");

  // for (const btn of [paperBtn, rockBtn, scissorsBtn]) {
  //   btn.addEventListener("click", (ev) => handleButtonClick(ev));
  // }

  const btns = function (): HTMLButtonElement[] {
    let buttons: HTMLButtonElement[] = [];
    for (const prs of choices) {
      buttons.push(
        getElementByIdOrThrow<HTMLButtonElement>(`btn-${prs}`)
      );
    }
    return buttons;
  }

  function disableBtns(): void {
    for (const btn of btns()) {
      btn.disabled = true;
    }
  }

  let counter: number = 1;

  function displayRoundResults(verdict: Verdict): void {
    if (counter == 1) { round1.textContent = `Round: 1:${emojiMapping[verdict]}` }
    if (counter == 2) { round2.textContent = `Round: 2:${emojiMapping[verdict]}` }
    if (counter == 3) { round3.textContent = `Round: 3:${emojiMapping[verdict]}` }
    if (counter == 3) {disableBtns()}
    counter++;
  }

  function calculateOverallWinner(): void {
    // thinking of getting textContent from round elements to compare
    // or get values from return states in displayRoundResults
  } 

  btns().forEach((btn) => {
    btn.addEventListener("click", (ev) => {



      // const btn = ev.currentTarget;
      // assert(btn instanceof HTMLButtonElement, "Event target is not a button!");
      const uc = btn.getAttribute("data-choice");
      // const uc = btn.dataset.choice;
      assert(
        typeof uc === "string" && isValidChoice(uc),
        "Not a valid choice",
      );

      const cc = getComputerChoice();
      const verdict = evaluateGame(uc, cc);
      displayRoundResults(verdict);
      // console.log({ uc, cc, verdict });

      // TODO: 
      // [DONE DID] - Update message and result elements
      // comChoice.textContent = choiceToEmoji(cc);
      // resultElm.textContent = choiceToEmoji(verdict);
      comChoice.textContent = emojiMapping[cc];
      resultElm.textContent = emojiMapping[verdict];
    }
    )
  });

}
main();