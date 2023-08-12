import {
  choices,
  choiceToEmoji,
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
    console.log(buttons);
    return buttons;
  }

  function disableBtns(): void {
    for (const btn of btns()) {
      btn.disabled = true;
    }
  }

  // function computeRounds() {
  //   const round = getElementByIdOrThrow<HTMLParagraphElement>("round");
  //   let roundNum: number = 1;
  //   console.log(roundNum);
  //   if (roundNum < 3) {
  //     roundNum++
  //   }
  //   if (roundNum === 3) disableBtns();
  //   round.textContent = `Round: ${roundNum}`;
  // }

  const round = getElementByIdOrThrow<HTMLParagraphElement>("round");
  let roundNum: number = 1;

  btns().forEach((btn) => {
    btn.addEventListener("click", (ev) => {

      roundNum++;
      console.log(roundNum);
      if (roundNum === 3) {disableBtns()}
      round.textContent = `Round: ${roundNum}`;

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

      // console.log({ uc, cc, verdict });

      // TODO: 
      // [DONE DID] - Update message and result elements
      // comChoice.textContent = choiceToEmoji(cc);
      // resultElm.textContent = choiceToEmoji(verdict);
      comChoice.textContent = emojiMapping[cc];
      resultElm.textContent = emojiMapping[verdict];
    }
    )});
  
}
main();