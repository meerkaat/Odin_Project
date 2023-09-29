console.clear();

function addFourNumbers(
  n1: number,
  n2: number,
  n3: number,
  n4: number,
): number {
  return n1 + n2 + n3 + n4;
}

function addThreeMaybeFourNumbers(
  n1: number,
  n2: number,
  n3: number,
  n4: number = 0,
): number {
  return n1 + n2 + n3 + n4;
}

/*
addThreeMaybeFourNumbers(1, 2, 3); // n4 === 0
addThreeMaybeFourNumbers(1, 2, 3, undefined); // n4 === 0
addThreeMaybeFourNumbers(1, 2, 3, 4); // n4 === 4
addThreeMaybeFourNumbers(1, 2, 3, null); // n4 === null
*/

function addThreeNumbers(n1: number, n2: number, n3: number): number {
  return n1 + n2 + n3;
}

function addTwoNumbers(n1: number, n2: number): number {
  return n1 + n2;
}

function identity<T>(value: T): T {
  return value;
}

function returnZero(): 0 {
  return 0;
}

type HandleThreeNumbers = (n1: number, n2: number, n3: number) => number;

function processASeriesOfThreeNumbers(fn: HandleThreeNumbers): number[] {
  const series = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ] as const;

  // When calling a function with a defined arity, all arguments must be provided.
  // Try enabling/disabling the different return statements below by (un-)commenting
  // to see the actual compiler errors.

  // return series.map(([n1, n2, n3]) => fn(n1, n2)); /* Error
  //                                     ~~~~~~~~~~
  //                     Expected 3 arguments, but got 2.(2554) */

  // return series.map(([n1, n2, n3]) => fn(n1)); /* Error
  //                                     ~~~~~~
  //                     Expected 3 arguments, but got 1.(2554) */

  return series.map(([n1, n2, n3]) => fn(n1, n2, n3)); // Ok
}

// But the function that receives the arguments isn't required to use them all:
console.log(processASeriesOfThreeNumbers(addThreeMaybeFourNumbers)); // Ok -> [6, 15, 24]
console.log(processASeriesOfThreeNumbers(addThreeNumbers)); // Ok -> [6, 15, 24]
console.log(processASeriesOfThreeNumbers(addTwoNumbers)); // Ok -> [3, 9, 15]
console.log(processASeriesOfThreeNumbers(identity)); // Ok -> [1, 4, 7]
console.log(processASeriesOfThreeNumbers(returnZero)); // Ok -> [0, 0, 0]

// console.log(processASeriesOfThreeNumbers(addFourNumbers)); /* Error
//                                          ~~~~~~~~~~~~~~~
// Argument of type '(n1: number, n2: number, n3: number, n4: number) => number' is not assignable to parameter of type 'HandleThreeNumbers'.
//   Target signature provides too few arguments. Expected 4 or more, but got 3.ts(2345) */

// Just like the callback function for Array.prototype.map:
console.log([1, 2, 3].map((n) => n * 2)); //-> [2, 4, 6]

// In the above callback, only the first argument (n) is used
// in order to dobule the value, but the full callback signature is this:

// Array<number>.map<number>(
//   callbackfn: (value: number, index: number, array: number[]) => number,
//   thisArg?: any,
// ): number[]

// And we could use more of them, for example:

console.log(
  [1, 2, 3].map((n, index) =>
    `The double of the value at index ${index} in the input array is ${n * 2}`
  ),
); /* -> [
  "The double of the value at index 0 in the input array is 2",
  "The double of the value at index 1 in the input array is 4",
  "The double of the value at index 2 in the input array is 6",
] */
