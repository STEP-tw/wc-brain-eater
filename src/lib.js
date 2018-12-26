const TAB = "\t";
const NEWLINE = "\n";
const EMPTY = "";
const SPACE = " ";

const isNotEmpty = x => x != EMPTY;

const getLinesCount = function(content) {
  return content.split(NEWLINE).length;
};

const getCharCount = function(content) {
  return content.split(EMPTY).length;
};

const wordsCount = function(line) {
  return line.split(SPACE).filter(isNotEmpty).length;
};

const add = (num1, num2) => num1 + num2;

const getWordsCount = function(content) {
  let lines = content.split(NEWLINE);
  let wordCounts = lines.map(wordsCount);
  return wordCounts.reduce(add);
};

const count = function(fileName, fs) {
  const file = fs.readFileSync(fileName, "utf-8");
  let noOflines = getLinesCount(file);
  let noOfWords = getWordsCount(file);
  let noOfCharacters = getCharCount(file);
  let output = ["", noOflines, noOfWords, noOfCharacters].join(TAB);
  return output + " " + fileName;
};

module.exports = {
  count
};
