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

  for (const prs of choices) {
    const btn = getElementByIdOrThrow<HTMLButtonElement>(`btn-${prs}`);

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

      console.log({ uc, cc, verdict });

      // TODO: 
      // [DONE DID] - Update message and result elements
      // comChoice.textContent = choiceToEmoji(cc);
      // resultElm.textContent = choiceToEmoji(verdict);
      comChoice.textContent = emojiMapping[cc];
      resultElm.textContent = emojiMapping[verdict];
    });
  }
}

main();