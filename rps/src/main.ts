import {
  choices,
  // choiceToEmoji,
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

//*------------------------------------------------------------------------------------------------*/

function main() {
  const messageElm = getElementByIdOrThrow<HTMLDivElement>("message");
  const resultElm = getElementByIdOrThrow<HTMLDivElement>("result");
  const comChoice = getElementByIdOrThrow<HTMLSpanElement>("com-choice");

  const round1 = getElementByIdOrThrow<HTMLParagraphElement>("round1");
  const round2 = getElementByIdOrThrow<HTMLParagraphElement>("round2");
  const round3 = getElementByIdOrThrow<HTMLParagraphElement>("round3");

  const tieBreaker = getElementByIdOrThrow<HTMLParagraphElement>("tie-breaker");

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
        element.textContent = `Round ${counter} : ${result}`;
        roundResultsArr.push(result);
      } else {
        // create set. if all values are unique create tie breaker element. 
        tieBreaker.textContent = `Tie Breaker: ${result}`;
        roundResultsArr.push(result);
        // round3.after(tieBreaker)
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
        match.textContent = emoji;
        disableBtns();
        break;
      }
    }
  }

  function forceNoTie(cc: PRS): PRS {
    let tempChoices = choices.filter((value) => value !== cc);
    // console.log(tempChoices)
    let newCC = getRandomElement(tempChoices);
    return newCC;
  }

  // function generateVerdict(uc: PRS, cc: PRS): PRS {
  //   const verdict = evaluateGame(uc, cc);
  //   let tieArr = [];
  //   let newCC;

  //   if (verdict === Verdict.Tie) {
  //     tieArr.push(verdict);
  //     if (tieArr.length === 1) {
  //       newCC = forceNoTie(cc);
  //     }
  //   }

  //   assert(typeof newCC === "string" && isValidChoice(newCC),
  //     "Not a valid choice");

  //   return newCC;
  // }

  //*------------------------------------------------------------------------------------------------*/
  let tieArr: Verdict[] = [];
  
  for (let i = 0; i < 20; i++) {
    // btns().forEach((btn) => {
    // btn.addEventListener("click", (ev) => {
    console.log("Second", tieArr);
    const uc = getComputerChoice();
    let cc = getComputerChoice();
    // let cc = "paper" as PRS;
    assert(
      typeof uc === "string" && isValidChoice(uc),
      "Not a valid choice",
    );

    // let randomRound = Math.floor(Math.random() * 3 + 1);

    // if (counter === randomRound) cc = forceNoTie(cc);
    // if (counter === 4 && uc === cc) cc = forceNoTie(cc);

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
    console.log({ verdict, uc, cc });

    comChoice.textContent = emojiMapping[cc];
    resultElm.textContent = emojiMapping[verdict];
    // });
    // });
  }
}
main();
