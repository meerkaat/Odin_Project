# Focus

One round of rps.

---

### Implment logic with UI

What happens when win?
  - rps emoji stays in hover state for user and computer
  - color background of winner/loser
    - winner - green
    - loser - red

---

# To-do

- [] move node_modules to gitignore (Ref: https://github.com/github/gitignore/blob/main/Node.gitignore)

## UI
- [] layout
  - [x] player emojis
  - [x] rounds
  - [x] do something with tie games???
  - [] buttons style

- [x] change round border color for win/lose/tie

- [] cycle emojis for rounds
  - [x] figure out how to cycle emjois
    - check comments on function
  - [] stop at end of round and move to, and start, on next round

- [x] emoji state
  - [x] display user choice
  - [x] display computer choice

- [] twemoji?

---

## TS
- [x] create round counter
  - [x] refactor rounds counter; create function
  - [x] best of three
  - [x] no tie on tie-breaker 
      - [x] ISSUE: two ties are not creating tie breaker
      - computer doesn't choose user choice 
- [x] add reset button
- [x] win/lose selector

---

# Questions
1) Why did I need to delete this variable for the DOM to react         correctly? It would not cycle emjois in `round1` if I only deleted the    `test div` in the HTML. 

2) See comments on `cycleEmjoji()` for TS shenanigans. 

3) `keyof typeof`

4) talk about moduleDetection

---

# Snippets

```css
html {
  background-color: rgba(251, 228, 53, 0.555);
}
```

```sh
npm run start
```

```sh
# web types
npm install -D @types/web
```

```js
function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }
    
    const map = {"first" : "1", "second" : "2"};
    console.log(getKeyByValue(map,"2"));
```
```js
function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}
```
---
## Arity
```ts
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

  cycle(
    letters,
    (stop, letter) => {
      console.log(letter);
      if (done && chosenLetter === letter) stop();
    },
    { interval: 100 }, // Change this interval to modify the cycle speed
  );
}

main();
```

---

# Emoji

- 📜
- ⚔️
- 🪨
- 🧙‍♂️
- 🤖