const choices = ["rock", "paper", "scissors"];
const computerChoice = () => {
    const min = Math.ceil(0);
    const max = Math.floor(2);
    const randNum = Math.floor(Math.random() * (max - min + 1) + min);
    return choices[randNum];
};
const userChoice = (num) => {
    return choices[num];
};
function evaluateWinner(uc, cc) {
    let condition = "";
    if (uc === cc) {
        condition = "Tie";
    }
    else if (uc === "rock") {
        condition = cc === "paper" ? "Computer Wins" : "User Wins";
    }
    else if (uc === "paper") {
        condition = cc === "scissors" ? "Computer Wins" : "User Wins";
    }
    else if (uc === "scissors") {
        condition = cc === "rock" ? "Computer Wins" : "User Wins";
    }
    return condition;
}
const userResult = userChoice(1);
const computerResult = computerChoice();
const winner = evaluateWinner(userResult, computerResult);
console.log("Computer: " + computerResult);
console.log("User: " + userResult);
console.log(winner);
export {};
