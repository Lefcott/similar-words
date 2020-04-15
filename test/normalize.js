const { normalize } = require('..');

const result = normalize('HOóoola, cóMO estás?') === 'hola, como estas?';
if (!result) console.error('"normalize" test failed');

module.exports = result;
