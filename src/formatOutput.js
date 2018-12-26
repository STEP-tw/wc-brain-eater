const { TAB, SPACE, isUndefined } = require("./stringUtils");

const formatOutput = function(fileDetails) {
  const { lines, words, chars, name } = fileDetails;
  let output = [lines, words, chars].filter(isUndefined);
  return output.join(TAB) + SPACE + name;
};

module.exports = { formatOutput };
