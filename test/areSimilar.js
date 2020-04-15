const { configure, areSimilar } = require("..");

configure({
  0: 0,
  3: 1,
  5: 2,
  7: 3,
});

const mustBe = (value) => (...params) => {
  const currResult = areSimilar(...params);
  if (currResult !== value)
    console.error('"areSimilar" test failed with params', ...params);
  return currResult === value;
};

let result = true;
result = result && mustBe(true)("Hoolá", "HOOOOLLáA");
result = result && mustBe(true)("hola", "hols");
result = result && mustBe(true)("el", "el");
result = result && mustBe(true)("hola", "jola");
result = result && mustBe(true)("abcde", "sbfde");
result = result && mustBe(true)("abcdefg", "avcfrfg", "avcfrfh");
result = result && mustBe(true)("Hola", "hoal");
result = result && mustBe(true)("Conexión", "coneixon");
result = result && mustBe(false)("el", "ek");
result = result && mustBe(false)("hello", "hellt");
result = result && mustBe(false)("abc", "qwe");

module.exports = result;
