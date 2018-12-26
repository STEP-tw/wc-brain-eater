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

const getFileDetails = function(fs, options, fileName) {
  let fileDetails = { name: fileName };
  let content = fs.readFileSync(fileName, "utf-8");
  const counts = getCounts(content);
  for (option of options) {
    fileDetails[option] = counts[option];
  }
  return fileDetails;
};

const count = function(args, fs) {
  let { options, fileNames } = parse(args);
  const fileDetailsObjects = fileNames.map(
    getFileDetails.bind(null, fs, options)
  );
  return fileDetailsObjects.map(formatOutput).join("\n");
};

module.exports = {
  count
};
