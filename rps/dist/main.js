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
        return cc === "paper" ? "Computer" : "User";
    if (uc === "paper")
        return cc === "scissors" ? "Computer" : "User";
    return cc === "rock" ? "Computer" : "User";
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
    return score.Computer > score.User ? "Computer"
        : score.User > score.Computer ? "User"
            : "Tie";
};
console.log(getGood());
for (let i = 0; i < 30; i += 1) {
    console.log(getGood());
}
export {};
