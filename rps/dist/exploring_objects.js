const disposition = "contemplative";
const add = (numbers) => {
    let sum = 0;
    for (const n of numbers)
        sum += n;
    return sum;
};
console.log("the add function can be turned into a string:", add.toString());
const obj = {
    2: "hello",
    disposition,
    name: "meerkaat",
    [disposition]: true,
};
console.log(obj);
export {};
