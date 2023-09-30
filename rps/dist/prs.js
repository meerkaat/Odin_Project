export const choices = [
    "rock",
    "paper",
    "scissors",
];
export function isValidChoice(input) {
    return choices.includes(input);
}
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export const getComputerChoice = () => {
    return getRandomElement(choices);
};
function isValidIndex(num) {
    return num === 0 || num === 1 || num === 2;
}
export const Verdict = {
    Computer: "Computer",
    Tie: "Tie",
    User: "User",
};
export function evaluateGame(uc, cc) {
    if (uc === cc)
        return "Tie";
    if (uc === "rock")
        return cc === "paper" ? Verdict.Computer : Verdict.User;
    if (uc === "paper") {
        return cc === "scissors" ? Verdict.Computer : Verdict.User;
    }
    return cc === "rock" ? Verdict.Computer : Verdict.User;
}
export const emojiMapping = {
    paper: "📜",
    rock: "🪨",
    scissors: "⚔️",
    [Verdict.User]: "🇼",
    [Verdict.Computer]: "🇱",
    [Verdict.Tie]: "🤷",
};
//# sourceMappingURL=prs.js.map