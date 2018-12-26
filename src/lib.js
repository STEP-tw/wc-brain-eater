const {
  NEWLINE,
  EMPTY,
  SPACE,
  isNotEmpty,
  TAB,
  replace
} = require("./stringUtils");

const { parse } = require("./parse");

const getLineCount = function(content) {
  return content.split(NEWLINE).length - 1;
};

const getCharCount = function(content) {
  return content.split(EMPTY).length;
};

const getWordCount = function(content) {
  content = replace(content, NEWLINE, SPACE);
  return content.split(SPACE).filter(isNotEmpty).length;
};

const getCounts = function(file) {
  return {
    w: getWordCount(file),
    c: getCharCount(file),
    l: getLineCount(file)
  };
};

const count = function(args, fs) {
  let { options, fileName } = parse(args);
  const file = fs.readFileSync(fileName, "utf-8");
  let counts = getCounts(file);
  let requestedCounts = options.map(option => counts[option]);
  return requestedCounts.join(TAB) + SPACE + fileName;
};

module.exports = {
  count
};
