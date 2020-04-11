const adjacents = {
  a: ['q', 'w', 's', 'z'],
  b: ['v', 'g', 'h', 'n'],
  c: ['x', 'd', 'f', 'v'],
  d: ['s', 'w', 'e', 'r', 'f', 'c', 'x'],
  e: ['w', '3', '4', 'r', 'f', 'd', 's'],
  f: ['d', 'e', 'r', 't', 'g', 'v', 'c'],
  g: ['f', 'r', 't', 'y', 'h', 'b', 'v'],
  h: ['g', 't', 'y', 'u', 'j', 'n', 'b'],
  i: ['u', '8', '9', 'o', 'l', 'k', 'j'],
  j: ['h', 'y', 'u', 'i', 'k', 'm', 'n'],
  k: ['j', 'u', 'i', 'o', 'l', 'm'],
  l: ['k', 'i', 'o', 'p', 'n'],
  m: ['n', 'j', 'k'],
  n: ['b', 'h', 'j', 'm', 'i', 'o', 'p'],
  o: ['i', '9', '0', 'p', 'n', 'l', 'k'],
  p: ['o', '9', '0', 'n', 'l'],
  q: ['1', '2', 'w', 's', 'a'],
  r: ['e', '4', '5', 't', 'g', 'f', 'd'],
  s: ['a', 'q', 'w', 'e', 'd', 'x', 'z'],
  t: ['r', '5', '6', 'y', 'h', 'g', 'f', 'r'],
  u: ['y', '7', '8', 'i', 'k', 'j', 'h'],
  v: ['c', 'f', 'g', 'b'],
  w: ['q', '2', '3', 'e', 'd', 's', 'a'],
  x: ['z', 's', 'd', 'c'],
  y: ['t', '6', '7', 'u', 'j', 'h', 'g'],
  z: ['a', 's', 'x'],
  0: ['9', 'p', 'o'],
  1: ['2', 'q'],
  2: ['1', '3', 'w', 'q'],
  3: ['2', '4', 'e', 'w'],
  4: ['3', '5', 'r', 'e'],
  5: ['4', '6', 't', 'r'],
  6: ['5', '7', 'y', 't'],
  7: ['6', '8', 'u', 'y'],
  8: ['7', '9', 'i', 'u'],
  9: ['8', '0', 'o', 'i']
};
let errorRules = {
  3: 1,
  5: 2,
  7: 3
};
let ruleLens = [0];
const setRuleLens = () =>
  (ruleLens = Object.keys(errorRules)
    .map(key => parseInt(key, 10))
    .sort());
setRuleLens();

/**
 * Package Configuration
 * @param {object} Rules - JSON where keys are min string lengths and values are max typing errors
 */
const configure = Rules => {
  if (Rules.errorRules) {
    ({ errorRules } = Rules);
    setRuleLens();
  }
};

const normalize = word => {
  if (typeof word !== 'string') return word;
  const w = word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  let result = '';
  for (let k = 0; k < w.length; k += 1) if (w[k - 1] !== w[k]) result += w[k];

  return result;
};

const compare = (word1, word2) => {
  if (typeof word1 !== 'string' || typeof word2 !== 'string') return false;
  const maxLen = Math.max(word1.length, word2.length);
  let errors = 0;
  for (let k = 0; k < maxLen; k += 1) if (word1[k] !== word2[k]) errors += 1;
  let maxErrors;
  for (let k = 0; k < ruleLens.length; k += 1) if (maxLen >= ruleLens[k]) maxErrors = errorRules[ruleLens[k]];
  if (errors > maxErrors) return false;
  let different = 0;
  for (let k = 0; k < maxLen; k += 1) {
    const adj = adjacents[word1[k]] || [];
    if (word1[k] !== word2[k]) {
      if (!adj.includes(word2[k])) return false;
      different += 1;
    }
  }
  return different <= maxErrors;
};

/**
 * Checks whether passed words are similar or not
 * @param  {...string} words - Words to compare
 * @returns {boolean}
 */
const areSimilar = (...words) => {
  for (let k = 0; k < words.length - 1; k += 1)
    if (!compare(normalize(words[k]), normalize(words[k + 1]))) return false;
  return true;
};

module.exports = { configure, normalize, areSimilar };
