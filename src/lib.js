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

const getDefaultFileDetails = function(fileName, defaultValue) {
  return {
    name: fileName,
    words: defaultValue,
    chars: defaultValue,
    lines: defaultValue
  };
};

const addFileDetails = function(file1Details, file2Details) {
  let lines = file1Details.lines + file2Details.lines;
  let words = file1Details.words + file2Details.words;
  let chars = file1Details.chars + file2Details.chars;
  let name = "total";
  return {
    name,
    lines,
    words,
    chars
  };
};

const wc = function(args, fs, console) {
  let { counts, fileNames } = parse(args);
  let fileNo = 1;
  let formatter = getFormater();
  fileNames.forEach(fileName => {
    let needTotal = isTotalNeeded(fileNames, fileNo);
    let args = { counts, fileName, needTotal };
    let countFile = count.bind(null, args, console, formatter);
    fs.readFile(fileName, "utf8", countFile);
    fileNo++;
  });
};

const count = function(args, console, formatter, err, data) {
  const { counts, fileName, needTotal } = args;
  const allCounts = getCounts(data);
  let fileDetails = { name: fileName };
  counts.forEach(option => {
    fileDetails[option] = allCounts[option];
  });
  console.log(formatter(fileDetails, needTotal));
};

const getFormater = function() {
  let totalFileDetails = getDefaultFileDetails("total", 0);
  return function(fileDetails, needTotal = false) {
    totalFileDetails = addFileDetails(totalFileDetails, fileDetails);
    if (needTotal) {
      return formatOutput(fileDetails) + "\n" + formatOutput(totalFileDetails);
    }
    return formatOutput(fileDetails);
  };
};

const isTotalNeeded = function(fileNames, fileNo) {
  return isLastFile(fileNames, fileNo) && !isSingleFile(fileNames);
};

const isSingleFile = function(fileNames) {
  return fileNames.length == 1;
};

const isLastFile = function(fileNames, fileNo) {
  return fileNames.length == fileNo;
};

module.exports = {
  wc
};
