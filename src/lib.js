const { NEWLINE, EMPTY, SPACE, isNotEmpty, replace } = require("./stringUtils");

const { parse } = require("./parse");

const { formatOutput } = require("./formatOutput");

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

const getCounts = function(fileContent) {
  return {
    words: getWordCount(fileContent),
    chars: getCharCount(fileContent),
    lines: getLineCount(fileContent)
  };
};

const getFileDetails = function(fs, fileName, options) {
  let fileDetails = { name: fileName };
  let content = fs.readFileSync(fileName, "utf-8");
  const counts = getCounts(content);
  for (option of options) {
    fileDetails[option] = counts[option];
  }
  return fileDetails;
};

const count = function(args, fs) {
  let { options, fileName } = parse(args);
  const fileDetails = getFileDetails(fs, fileName, options);
  return formatOutput(fileDetails);
};

module.exports = {
  count
};
