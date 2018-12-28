const { TAB, SPACE, isUndefined } = require("./stringUtils");

const isNumber = x => !isNaN(x);

const fileNotFoundMsg = function(fileName) {
  return "wc: " + fileName + ": open: No such file or directory";
};
const formatOutput = function(fileDetails) {
  const { lines, words, chars, name, exists } = fileDetails;
  if (!exists) {
    return fileNotFoundMsg(name);
  }
  let output = [lines, words, chars].filter(isNumber);
  return output.join(TAB) + SPACE + name;
};

module.exports = { formatOutput };
