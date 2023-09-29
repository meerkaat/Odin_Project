type CycleCallback<T = unknown> = (
  stop: () => void,
  value: T,
  index: number,
  array: ReadonlyArray<T>,
) => void;

type CycleOptions = {
  /** milliseconds */
  interval: number;
};

function cycle<const T>(
  array: ReadonlyArray<T>,
  callback: CycleCallback<T>,
  options: CycleOptions,
): () => void {
  if (array.length === 0) return () => {};

  let index = 0;
  const stop = () => clearInterval(id);

  const id = setInterval(() => {
    index = (index + 1) % array.length;
    callback(stop, array[index]!, index, array);
  }, options.interval);

  callback(stop, array[index]!, index, array);
  return stop;
}

function main() {
  console.clear();

  const letters = ["a", "b", "c"] as const;
  let chosenLetter: typeof letters[number];
  let done = false;

  setTimeout(() => {
    chosenLetter = "c"; // Try changing this letter
    done = true;
  }, 1e3);

  // const callback: CycleCallback<typeof letters[number]> = (stop, letter) => {
  //   console.log(letter);
  //   if (done && chosenLetter === letter) stop();
  // };

  // const callback: (stop: () => void, letter: typeof letters[number]) => void = (
  //   stop,
  //   letter,
  // ) => {
  //   console.log(letter);
  //   if (done && chosenLetter === letter) stop();
  // };

  const callback = (stop: () => void, letter: typeof letters[number]): void => {
    console.log(letter);
    if (done && chosenLetter === letter) stop();
  };

  cycle(
    letters,
    callback,
    { interval: 100 }, // Change this interval to modify the cycle speed
  );
}

main();

/*

const myObj = {
  greet(name: string): void {
    console.log(`Hello ${name}!`);
  },
};

type GreetFn = typeof myObj["greet"];

*/
