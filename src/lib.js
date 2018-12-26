const {
  NEWLINE,
  EMPTY,
  SPACE,
  isNotEmpty,
  TAB,
  replace
} = require("./stringUtils");

const getLinesCount = function(content) {
  return content.split(NEWLINE).length - 1;
};

const getCharCount = function(content) {
  return content.split(EMPTY).length;
};

const getWordsCount = function(content) {
  content = replace(content, NEWLINE, SPACE);
  return content.split(SPACE).filter(isNotEmpty).length;
};

const isOption = x => x.startsWith("-");

const count = function(args, fs) {
  const [firstArg, secondArg] = args;
  let fileName = isOption(firstArg) ? secondArg : firstArg;
  const file = fs.readFileSync(fileName, "utf-8");
  let noOflines = getLinesCount(file);

  if (isOption(firstArg)) {
    return noOflines + SPACE + fileName;
  }

  let noOfWords = getWordsCount(file);
  let noOfCharacters = getCharCount(file);
  let output = [noOflines, noOfWords, noOfCharacters].join(TAB);
  return output + SPACE + fileName;
};

module.exports = {
  count
};
