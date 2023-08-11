import { choices, } from "./prs.js";
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
    const btns = function createBtnArray() {
        let buttons = [];
        for (const prs of choices) {
            buttons.push(getElementByIdOrThrow(`btn-${prs}`));
        }
        console.log(buttons);
        return buttons;
    };
    function computeRounds() {
        let rounds = 1;
        if (rounds !== 3) {
            rounds++;
        }
    }
    main();
}
