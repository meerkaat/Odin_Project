## Focus

One round of rps.

### Implment logic with UI

What happens when win?
  - rps emoji stays in hover state for user and computer
  - color background of winner/loser
    - winner - green
    - loser - red

## To-do
### UI
- [ ] layout
- [x] figure out how to cycle emjois
  - check comments on function
  - [ ] 
- [ ] change round border color for win/lose/tie
- [ ] emoji state
- [ ] twemoji?

### TS
- [x] create round counter
  - [x] refactor rounds counter; create function
  - [x] best of three
  - [x] no tie on tie-breaker 
      - [x] ISSUE: two ties are not creating tie breaker
      - computer doesn't choose user choice 
- [x] add reset button
- [x] win/lose selector



## Questions
1) Why did I need to delete this variable for the DOM to react         correctly? It would not cycle emjois in `round1` if I only deleted the    `test div` in the HTML. 

2) See comments on `cycleEmjoji()` for TS shenanigans. 

## Snippets

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

## Emoji

- 📜
- ⚔️
- 🪨
- 🧙‍♂️
- 🤖