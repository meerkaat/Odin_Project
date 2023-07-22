const choices = [
    "rock",
    "paper",
    "scissors",
];
function getRandomElement(array) {
    const min = 0;
    const max = array.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    return array[index];
}
const getComputerChoice = () => getRandomElement(choices);
function isValidIndex(num) {
    return num === 0 || num === 1 || num === 2;
}
const getUserChoice = (num) => {
    if (!isValidIndex(num))
        throw new Error("Expected int 0, 1, 2");
    return choices[num];
};
const Verdict = {
    Computer: "Computer",
    Tie: "Tie",
    User: "User",
};
function evaluateGame(uc, cc) {
    if (uc === cc)
        return "Tie";
    if (uc === "rock")
        return cc === "paper" ? Verdict.Computer : Verdict.User;
    if (uc === "paper") {
        return cc === "scissors"
            ? Verdict.Computer
            : Verdict.User;
    }
    return cc === "rock" ? Verdict.Computer : Verdict.User;
}
const getGood = () => {
    const score = {
        Computer: 0,
        User: 0,
        Tie: 0,
    };
    let rounds = 0;
    while (rounds < 3) {
        let uc = getComputerChoice();
        let cc = getComputerChoice();
        const verdict = evaluateGame(uc, cc);
        score[verdict] += 1;
        rounds++;
    }
    return score.Computer > score.User
        ? "Computer"
        : score.User > score.Computer
            ? "User"
            : "Tie";
};
console.log(getGood());
function getElementByIdOrThrow(selector, msg = "Element not found") {
    const element = document.getElementById(selector);
    if (!element)
        throw new Error(msg);
    return element;
}
const userCol = getElementByIdOrThrow("user-row-one");
let userColPos = userCol.getBoundingClientRect();
const userCol2 = getElementByIdOrThrow("user-row-two");
let userColPos2 = userCol2.getBoundingClientRect();
const roundSelector = getElementByIdOrThrow("round-selector");
const btn = getElementByIdOrThrow("btn");
btn.addEventListener("click", (e) => {
    userCol2.append(roundSelector);
    roundSelector.style.backgroundColor = "black";
});
console.log(userColPos);
export {};
