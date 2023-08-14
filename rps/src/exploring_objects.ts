const disposition = "contemplative";

// const add = (numbers: readonly number[]): number => {
//   let sum = 0;
//   for (const n of numbers) sum += n;
//   return sum;
// };
const add = (numbers: readonly number[]): number => {
  let sum = 0;
  for (const n of numbers) sum += n;
  return sum;
};

console.log("the add function can be turned into a string:", add.toString());

const obj = {
  // [Symbol("hi there")]: 12,
  2: "hello",
  disposition,
  name: "meerkaat",
  // [add]: "the key for this value should a string representing the serialized function",
  [disposition]: true,
};

console.log(obj);

// console.log({
//   obj,
//   "obj keys": Object.keys(obj),
// });

// const hello = obj["2"];
// const hello2 = obj[2];

// console.log(obj["name"]);
// console.log(obj.name);}
// console.log(obj.2);
// console.log(obj["2"]);

// console.log({
//   hello,
//   hello2,
// });

// const array = ["a", "b", "c"] as const;

// console.log(Object.keys(array));

// console.log("this is b:", array[1]);

// const value = array["1"];

// console.log("this is b:", array["1"]);
