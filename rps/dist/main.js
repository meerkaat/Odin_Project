import { choices, emojiMapping, evaluateGame, getComputerChoice, getRandomElement, isValidChoice, Verdict, } from "./prs.js";
import { assert } from "./assert.js";
function getElementByIdOrThrow(selector, msg = "Element not found") {
    const element = document.getElementById(selector);
    if (!element)
        throw new Error(msg);
    return element;
}
function main() {
    const messageElm = getElementByIdOrThrow("message");
    const resultElm = getElementByIdOrThrow("result");
    const comChoice = getElementByIdOrThrow("com-choice");
    const round1 = getElementByIdOrThrow("round1");
    const round2 = getElementByIdOrThrow("round2");
    const round3 = getElementByIdOrThrow("round3");
    const tieBreaker = getElementByIdOrThrow("tie-breaker");
    const match = getElementByIdOrThrow("match-result");
    const btns = function () {
        let buttons = [];
        for (const prs of choices) {
            buttons.push(getElementByIdOrThrow(`btn-${prs}`));
        }
        return buttons;
    };
    function disableBtns() {
        for (const btn of btns()) {
            btn.disabled = true;
        }
    }
    let counter = 1;
    let roundResultsArr = [];
    function displayRoundResults(verdict, uc, cc) {
        const elements = {
            1: round1,
            2: round2,
            3: round3,
            4: tieBreaker,
        };
        if (counter in elements) {
            const element = elements[counter];
            let result = emojiMapping[verdict];
            if (counter <= 3) {
                element.textContent = `Round ${counter} : ${result}`;
                roundResultsArr.push(result);
            }
            else {
                tieBreaker.textContent = `Tie Breaker: ${result}`;
                roundResultsArr.push(result);
            }
        }
        counter++;
    }
    function evaluateOverallWinner() {
        const counts = new Map();
        for (const value of roundResultsArr) {
            counts.set(value, (counts.get(value) ?? 0) + 1);
            counts.delete(emojiMapping.Tie);
        }
        for (const [emoji, count] of counts.entries()) {
            if (count > 1) {
                match.textContent = emoji;
                disableBtns();
                break;
            }
        }
    }
    function forceNoTie(cc) {
        let tempChoices = choices.filter((value) => value !== cc);
        let newCC = getRandomElement(tempChoices);
        return newCC;
    }
    let tieArr = [];
    for (let i = 0; i < 20; i++) {
        console.log("Second", tieArr);
        const uc = getComputerChoice();
        let cc = getComputerChoice();
        assert(typeof uc === "string" && isValidChoice(uc), "Not a valid choice");
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
    }
}
main();
