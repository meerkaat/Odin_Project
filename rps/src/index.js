"use strict";
function computerChoice() {
    const min = Math.ceil(0);
    const max = Math.floor(2);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/*
0 = rock
1 = paper
2 = scissors
*/
function numToChoice(num) {
    switch (num) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}
;
const computerC = computerChoice();
console.log(computerC);
console.log(numToChoice(computerC));
