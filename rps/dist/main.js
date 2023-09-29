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
const userElements = {
    1: round1,
    2: round2,
    3: round3,
    4: tieBreaker,
};
const computerElements = {
    1: computerRound1,
    2: computerRound2,
    3: computerRound3,
    4: computerTie,
};
function displayUserRoundResults(elements, verdict, uc) {
    if (userCounter in elements) {
        let element = elements[userCounter];
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
function displayComputerRoundResults(elements, cc) {
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
function cycleEmojis(callback) {
    const emojis = [
        emojiMapping.paper,
        emojiMapping.rock,
        emojiMapping.scissors,
    ];
    let index = 0;
    let stop = () => clearInterval(interval);
    let interval = setInterval(() => {
        let userEl = userElements[userCounter];
        let computerEl = computerElements[computerCounter];
        userEl.textContent = `${emojis[index]}`;
        computerEl.textContent = `${emojis[index]}`;
        callback(stop, emojis[index]);
        index = (index + 1) % emojis.length;
    }, 300);
}
function evaluateOverallWinner() {
    const counts = new Map();
    for (const value of roundResultsArr) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
        counts.delete(emojiMapping.Tie);
    }
    let condition = false;
    for (const [emoji, count] of counts.entries()) {
        if (count > 1) {
            disableBtns(btnsArr);
            resetbtn.disabled = false;
            condition = true;
            break;
        }
    }
    return condition;
}
function forceNoTie(cc) {
    let tempChoices = choices.filter((value) => value !== cc);
    let newCC = getRandomElement(tempChoices);
    return newCC;
}
function main() {
    let tieArr = [];
    let userChoice = '';
    let computerChoice = '';
    cycleEmojis((stop, emoji) => {
        if (emoji === userChoice) {
            stop();
        }
    });
    btns().forEach((btn) => {
        btn.addEventListener("click", (ev) => {
            let uc = btn.getAttribute("data-choice");
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
            userChoice = emojiMapping[uc];
            computerChoice = emojiMapping[cc];
            displayUserRoundResults(userElements, verdict, uc);
            displayComputerRoundResults(computerElements, cc);
        });
    });
}
main();
