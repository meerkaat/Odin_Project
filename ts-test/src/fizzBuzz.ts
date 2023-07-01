// Return "fizz" if multiple of three and "buzz" otherwise

function FizzBuzz(num: number): void {
  for (let i = 1; i <= num; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log(`FizzBuzz - ${i}`);
    } else if (i % 5 === 0) {
      console.log(`Buzz - ${i}`);
    } else if (i % 3 === 0) {
      console.log(`Fizz - ${i}`);
    } else {
      console.log(i);
    }
  }
}

FizzBuzz(20);