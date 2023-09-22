import { choices, emojiMapping, evaluateGame, getComputerChoice, getRandomElement, isValidChoice, Verdict, } from "./prs.js";
import { assert } from "./assert.js";
function getElementByIdOrThrow(selector, msg = `Element '${selector}' not found`) {
    const element = document.getElementById(selector);
    if (!element)
        throw new Error(msg);
    return element;
}
const round1 = getElementByIdOrThrow("round1");
const round2 = getElementByIdOrThrow("round2");
const round3 = getElementByIdOrThrow("round3");
const tieBreaker = getElementByIdOrThrow("tie-breaker");
const computerRound1 = getElementByIdOrThrow("computer-round1");
const computerRound2 = getElementByIdOrThrow("computer-round2");
const computerRound3 = getElementByIdOrThrow("computer-round3");
const computerTie = getElementByIdOrThrow("computer-tie");
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
function changeBackgroundColorViaVerdict(verdict, element) {
    let parentRounds = element.parentElement;
    if (parentRounds === null)
        throw new Error("Parent element is null");
    verdict === "User"
        ? parentRounds.style.backgroundColor = "rgba(0, 117, 6, 0.603)"
        : parentRounds.style.backgroundColor = "rgba(221, 46, 69, 0.808)";
    if (verdict === "Tie")
        parentRounds.style.backgroundColor = "rgba(252, 151, 0, 0.507)";
}
let userCounter = 1;
let computerCounter = 1;
let roundResultsArr = [];
function displayUserRoundResults(verdict, uc) {
    const elements = {
        1: round1,
        2: round2,
        3: round3,
        4: tieBreaker,
    };
    if (userCounter in elements) {
        const element = elements[userCounter];
        let result = emojiMapping[verdict];
        if (userCounter <= 3) {
            element.textContent = emojiMapping[uc];
            changeBackgroundColorViaVerdict(verdict, element);
            roundResultsArr.push(result);
        }
        else {
            tieBreaker.textContent = emojiMapping[uc];
            changeBackgroundColorViaVerdict(verdict, element);
            roundResultsArr.push(result);
        }
    }
    userCounter++;
}
function displayComputerRoundResults(cc) {
    const elements = {
        1: computerRound1,
        2: computerRound2,
        3: computerRound3,
        4: computerTie,
    };
    if (computerCounter in elements) {
        let element = elements[computerCounter];
        if (computerCounter <= 3) {
            element.textContent = emojiMapping[cc];
        }
        else {
            element.textContent = emojiMapping[cc];
        }
    }
    computerCounter++;
}
function evaluateOverallWinner() {
    const counts = new Map();
    for (const value of roundResultsArr) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
        counts.delete(emojiMapping.Tie);
    }
    for (const [emoji, count] of counts.entries()) {
        if (count > 1) {
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
    let count = 0;
    let interval = setInterval(() => {
        if (!condition)
            clearInterval(interval);
        round1.textContent = `${emjois[count]}`;
        computerRound1.textContent = `${emjois[count]}`;
        count = (count + 1) % emjois.length;
    }, 500);
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
            displayUserRoundResults(verdict, uc);
            displayComputerRoundResults(cc);
            evaluateOverallWinner();
            comChoice.textContent = emojiMapping[cc];
        });
    });
}
main();
