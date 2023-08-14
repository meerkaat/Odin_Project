import { choices, emojiMapping, evaluateGame, getComputerChoice, isValidChoice, } from "./prs.js";
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
    function displayRoundResults(verdict) {
        if (counter == 1) {
            round1.textContent = `Round: 1:${emojiMapping[verdict]}`;
        }
        if (counter == 2) {
            round2.textContent = `Round: 2:${emojiMapping[verdict]}`;
        }
        if (counter == 3) {
            round3.textContent = `Round: 3:${emojiMapping[verdict]}`;
        }
        if (counter == 3) {
            disableBtns();
        }
        counter++;
    }
    function calculateOverallWinner() {
    }
    btns().forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            const uc = btn.getAttribute("data-choice");
            assert(typeof uc === "string" && isValidChoice(uc), "Not a valid choice");
            const cc = getComputerChoice();
            const verdict = evaluateGame(uc, cc);
            displayRoundResults(verdict);
            comChoice.textContent = emojiMapping[cc];
            resultElm.textContent = emojiMapping[verdict];
        });
    });
}
main();
