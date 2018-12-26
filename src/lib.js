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

const addFileDetails = function(file1Details, file2Details) {
  let lines = file1Details.lines + file2Details.lines;
  let words = file1Details.words + file2Details.words;
  let chars = file1Details.chars + file2Details.chars;
  let name = "total";
  return { name, lines, words, chars };
};

const getTotalCountsObject = function(fileDetailsObjects) {
  let totalObject = { lines: 0, words: 0, chars: 0 };
  return fileDetailsObjects.reduce(addFileDetails, totalObject);
};

const count = function(args, fs) {
  let { options, fileNames } = parse(args);
  const fileDetailsObjects = fileNames.map(
    getFileDetails.bind(null, fs, options)
  );
  if (fileNames.length > 1) {
    let totalDetailsObject = getTotalCountsObject(fileDetailsObjects);
    fileDetailsObjects.push(totalDetailsObject);
  }
  return fileDetailsObjects.map(formatOutput).join("\n");
};

module.exports = {
  count
};
