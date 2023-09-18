import { choices, emojiMapping, evaluateGame, getComputerChoice, getRandomElement, isValidChoice, Verdict, } from "./prs.js";
import { assert } from "./assert.js";
function getElementByIdOrThrow(selector, msg = "Element not found") {
    const element = document.getElementById(selector);
    if (!element)
        throw new Error(msg);
    return element;
}
const comChoice = getElementByIdOrThrow("com-choice");
const round1 = getElementByIdOrThrow("round1");
const round2 = getElementByIdOrThrow("round2");
const round3 = getElementByIdOrThrow("round3");
const tieBreaker = getElementByIdOrThrow("tie-breaker");
const match = getElementByIdOrThrow("match-result");
const resetbtn = getElementByIdOrThrow("reset");
resetbtn.disabled = true;
resetbtn.addEventListener("click", () => {
    location.reload();
});
function btns() {
    let buttons = [];
    for (const prs of choices) {
        buttons.push(getElementByIdOrThrow(`btn-${prs}`));
    }
    return buttons;
}
;
const btnsArr = btns();
function disableBtns(buttons) {
    for (const btn of buttons) {
        btn.disabled = true;
    }
}
let counter = 1;
let roundResultsArr = [];
function displayRoundResults(verdict) {
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
            element.textContent = `Round ${counter}: ${result}`;
            changeOutlineColorViaVerdict(verdict, element);
            roundResultsArr.push(result);
        }
        else {
            tieBreaker.textContent = `Tie Breaker: ${result}`;
            changeOutlineColorViaVerdict(verdict, element);
            roundResultsArr.push(result);
        }
    }
    counter++;
}
function changeOutlineColorViaVerdict(verdict, element) {
    verdict === "User"
        ? element.style.outline = "5px solid green"
        : element.style.outline = "5px solid red";
    if (verdict === "Tie")
        element.style.outline = "5px solid orange";
}
function evaluateOverallWinner() {
    const counts = new Map();
    for (const value of roundResultsArr) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
        counts.delete(emojiMapping.Tie);
    }
    for (const [emoji, count] of counts.entries()) {
        if (count > 1) {
            match.textContent = `Match: ${emoji}`;
            disableBtns(btnsArr);
            resetbtn.disabled = false;
            break;
        }
    }
}
function forceNoTie(cc) {
    let tempChoices = choices.filter((value) => value !== cc);
    let newCC = getRandomElement(tempChoices);
    return newCC;
}
function main() {
    let condition = true;
    const emjois = [
        emojiMapping.paper,
        emojiMapping.rock,
        emojiMapping.scissors,
    ];
    let tieArr = [];
    btns().forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            condition = false;
            console.log("Second", tieArr);
            const uc = btn.getAttribute("data-choice");
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
            displayRoundResults(verdict);
            evaluateOverallWinner();
            comChoice.textContent = emojiMapping[cc];
        });
    });
}
main();
