const passed = require("./normalize") && require("./areSimilar");

if (passed) console.log('Tests passed!');

module.exports = passed;
