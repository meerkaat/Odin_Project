export const choices = [
    "rock",
    "paper",
    "scissors",
];
export function isValidChoice(input) {
    return choices.includes(input);
}
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
export const getComputerChoice = () => getRandomElement(choices);
function isValidIndex(num) {
    return num === 0 || num === 1 || num === 2;
}
export const getUserChoice = (num) => {
    if (!isValidIndex(num))
        throw new Error("Expected int 0, 1, 2");
    return choices[num];
};
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
