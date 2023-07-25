import { choices, evaluateGame, getComputerChoice, choiceToEmoji, isValidChoice, } from "./prs.js";
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
    for (const prs of choices) {
        const btn = getElementByIdOrThrow(`btn-${prs}`);
        btn.addEventListener("click", (ev) => {
            const uc = btn.getAttribute("data-choice");
            assert(typeof uc === "string" && isValidChoice(uc), "Not a valid choice");
            const cc = getComputerChoice();
            const verdict = evaluateGame(uc, cc);
            console.log({ uc, cc, verdict });
            comChoice.textContent = choiceToEmoji(cc);
            resultElm.textContent = choiceToEmoji(verdict);
        });
    }
}
main();