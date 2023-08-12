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
    const btns = function () {
        let buttons = [];
        for (const prs of choices) {
            buttons.push(getElementByIdOrThrow(`btn-${prs}`));
        }
        console.log(buttons);
        return buttons;
    };
    function disableBtns() {
        for (const btn of btns()) {
            btn.disabled = true;
        }
    }
    const round = getElementByIdOrThrow("round");
    let roundNum = 1;
    btns().forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            roundNum++;
            console.log(roundNum);
            if (roundNum === 3) {
                disableBtns();
            }
            round.textContent = `Round: ${roundNum}`;
            const uc = btn.getAttribute("data-choice");
            assert(typeof uc === "string" && isValidChoice(uc), "Not a valid choice");
            const cc = getComputerChoice();
            const verdict = evaluateGame(uc, cc);
            comChoice.textContent = emojiMapping[cc];
            resultElm.textContent = emojiMapping[verdict];
        });
    });
}
main();
