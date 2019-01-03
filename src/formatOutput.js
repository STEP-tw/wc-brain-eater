const { TAB, SPACE } = require("./stringUtils");

const isNumber = x => !isNaN(x);

const formatOutput = function(fileDetails) {
  const { lines, words, chars, name } = fileDetails;
  let output = [lines, words, chars].filter(isNumber);
  return output.join(TAB) + SPACE + name;
};

module.exports = { formatOutput };
