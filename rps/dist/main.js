import { choices, emojiMapping, evaluateGame, getComputerChoice, isValidChoice, } from "./prs.js";
import { assert } from "./assert.js";
function getElementByIdOrThrow(selector, msg = "Element not found") {
    const element = document.getElementById(selector);
    if (!element)
        throw new Error(msg);
    return element;
}
export let counter = 1;
let roundResultsArr = [];
function main() {
    const messageElm = getElementByIdOrThrow("message");
    const resultElm = getElementByIdOrThrow("result");
    const comChoice = getElementByIdOrThrow("com-choice");
    const round1 = getElementByIdOrThrow("round1");
    const round2 = getElementByIdOrThrow("round2");
    const round3 = getElementByIdOrThrow("round3");
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
    function displayRoundResults(verdict) {
        const elements = {
            1: round1,
            2: round2,
            3: round3,
        };
        if (counter in elements) {
            const element = elements[counter];
            let result = emojiMapping[verdict];
            element.textContent = `Round ${counter}:${result}`;
            roundResultsArr.push(result);
            if (counter === 3)
                disableBtns();
        }
        counter++;
    }
    function evaluateOverallWinner() {
        const counts = new Map();
        for (const value of roundResultsArr) {
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
            const uc = btn.getAttribute("data-choice");
            let cc = getComputerChoice();
            assert(typeof uc === "string" && isValidChoice(uc), "Not a valid choice");
            function controlDestiny() {
                if (cc === uc) {
                    getComputerChoice();
                    controlDestiny();
                }
                return cc;
            }
            if (counter === 3)
                controlDestiny();
            const verdict = evaluateGame(uc, cc);
            displayRoundResults(verdict);
            evaluateOverallWinner();
            comChoice.textContent = emojiMapping[cc];
            resultElm.textContent = emojiMapping[verdict];
        });
    });
}
main();
