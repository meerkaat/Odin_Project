## Focus

One round of rps.

### Implment logic with UI

What happens when win?
  - rps emoji stays in hover state for user and computer
  - color background of winner/loser
    - winner - green
    - loser - red

## To-do
- [x] create round counter
  - [ ] refactor rounds counter; create function
  - [ ] best of three
  - [ ] no tie on tie-breaker 
      - computer doesn't choose user choice 
- [ ] add reset button
- [x] win/lose selector
- [ ] layout
- [ ] round/background selector
- [ ] emoji state
- [ ] twemoji?

## Questions


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