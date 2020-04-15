# Similar Words
Checks word typing errors.

### Optional Initialization:
```js
const { configure } = require('similar-words');

// This is the default configuration
configure({
  errorRules: {
    0: 0, // For words of length 0, 1 or or 2 it won't accept errors
    3: 1, // For words of length 3 or 4 it will accept maximum 1 typing error
    5: 2, // For words of length 5 or 6 it will accept maximum 2 typing errors
    7: 3 // For words of length greater or equal than 7 it will accept maximum 3 typing errors
  }
});
```

### Normalize a phrase:
```js
const { normalize } = require('similar-words');

normalize('Hooola cóMÓ ESTÁS???? aaaasdlfkasjdfkkkkkkkk');
// Returns 'hola como estas? asdlfkasjdfk'
```

### Check whether words are similar:
```js
const { areSimilar } = require('similar-words');

areSimilar('hello', 'helli'); // Returns true because 'i' is near to 'o' on the keyboard
areSimilar('the', 'thr'); // Returns true because 'r' is near to 'e' on the keyboard
areSimilar('bye', 'ybe'); // Returns true because you can invert 2 letters for getting the original word
areSimilar('the', 'thx'); // Returns false because 'x' is not near to 'e' on the keyboard
```
