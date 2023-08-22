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

function main() {

  const messageElm = getElementByIdOrThrow<HTMLDivElement>("message");
  const resultElm = getElementByIdOrThrow<HTMLDivElement>("result");
  const comChoice = getElementByIdOrThrow<HTMLSpanElement>("com-choice");

  const round1 = getElementByIdOrThrow<HTMLParagraphElement>("round1");
  const round2 = getElementByIdOrThrow<HTMLParagraphElement>("round2");
  const round3 = getElementByIdOrThrow<HTMLParagraphElement>("round3");

  const match = getElementByIdOrThrow<HTMLParagraphElement>("match-result");

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
  let roundResultsArr: EmojiOptions[] = [];

  function displayRoundResults(verdict: Verdict): void {
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

    // for (
    //   const [number, element] of [
    //     [1, round1],
    //     [2, round2],
    //     [3, round3],
    //   ] as const
    // ) {
    //   if (counter === number) {
    //     let result = emojiMapping[verdict];
    //     // ⚠️ Danger!!
    //     // eval(`round${number}`).textContent = `Round ${number}:${result}`;
    //     element.textContent = `Round ${number}:${result}`;
    //     roundResultsArr.push(result);
    // }
  }

  // function displayRoundResults(verdict: Verdict): void {
  //   // TODO: Refactor to loop?
  //   if (counter === 1) {
  //     // changed `emojiMapping: Record<PRS | Verdict, string>`
  //     // to `emojiMapping: Record<PRS | Verdict, EmojiOptions>`
  //     let result = emojiMapping[verdict];
  //     round1.textContent = `Round: 1:${result}`;
  //     roundResultsArr.push(result);
  //   }
  //   else if (counter === 2) {
  //     let result = emojiMapping[verdict];
  //     round2.textContent = `Round: 2:${result}`;
  //     roundResultsArr.push(result);
  //   }
  //   else if (counter === 3) {
  //     let result = emojiMapping[verdict];
  //     round3.textContent = `Round: 3:${result}`;
  //     roundResultsArr.push(result);
  //     disableBtns();
  //   }
  //   counter++;
  // }

  function evaluateOverallWinner() {
    // thinking of getting textContent from round elements to compare
    // or get values from return states in displayRoundResults

    // for (let i = 0; i < roundResultsArr.length; i++) {
    //   let value = roundResultsArr[i];
    //   assert(value, "Array does not exist");

    //   if (roundResultsArr.includes(value)) {
    //     match.textContent = value;
    //     disableBtns();
    //   }
    // }

    // if (roundResultsArr.length > new Set(roundResultsArr).size) {}

    const counts = new Map<EmojiOptions, number>();

    for (const value of roundResultsArr) {
      // let existingCount = counts.get(value);
      // if (existingCount === undefined) existingCount = 0;
      // const newCount = existingCount + 1;
      // counts.set(value, newCount);
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    for (const [emoji, count] of counts.entries()) {
      if (count > 1) {
        match.textContent = emoji;
        disableBtns();
        break;
      }
    }
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
      evaluateOverallWinner();
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