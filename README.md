# Similar Words
Checks word typing errors.

### Optional Initialization:
```js
const { configure } = require('similar-words');

// This is the default configuration
configure({
  errorRules: {
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