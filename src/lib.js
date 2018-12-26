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
  let contentWithoutNewline = replace(content, NEWLINE, SPACE);
  return contentWithoutNewline.split(SPACE).filter(isNotEmpty).length;
};

const count = function(fileName, fs) {
  const file = fs.readFileSync(fileName, "utf-8");
  let noOflines = getLinesCount(file);
  let noOfWords = getWordsCount(file);
  let noOfCharacters = getCharCount(file);
  let output = [noOflines, noOfWords, noOfCharacters].join(TAB);
  return output + SPACE + fileName;
};

module.exports = {
  count
};
