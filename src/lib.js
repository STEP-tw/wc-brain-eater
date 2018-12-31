const {
  NEWLINE,
  EMPTY,
  SPACE,
  isNotEmpty,
  replace
} = require("./stringUtils");

const {
  parse
} = require("./parse");

const {
  formatOutput
} = require("./formatOutput");

const getLineCount = function (content) {
  return content.split(NEWLINE).length - 1;
};

const getCharCount = function (content) {
  return content.split(EMPTY).length;
};

const getWordCount = function (content) {
  content = replace(content, NEWLINE, SPACE);
  return content.split(SPACE).filter(isNotEmpty).length;
};

const getCounts = function (fileContent) {
  return {
    words: getWordCount(fileContent),
    chars: getCharCount(fileContent),
    lines: getLineCount(fileContent)
  };
};

const getDefaultFileDetails = function (fileName, defaultValue) {
  return {
    name: fileName,
    exists: false,
    words: defaultValue,
    chars: defaultValue,
    lines: defaultValue
  };
};

const getFileDetails = function (fs, requiredCounts, fileName) {
  let fileDetails = getDefaultFileDetails(fileName);
  if (!fs.existsSync(fileName)) {
    return fileDetails;
  }
  fileDetails.exists = true;
  let content = fs.readFileSync(fileName, "utf-8");
  const counts = getCounts(content);
  requiredCounts.forEach(option => {
    fileDetails[option] = counts[option];
  });
  return fileDetails;
};

const addFileDetails = function (file1Details, file2Details) {
  let lines = file1Details.lines + file2Details.lines;
  let words = file1Details.words + file2Details.words;
  let chars = file1Details.chars + file2Details.chars;
  let name = "total";
  let exists = file1Details.exists;
  return {
    name,
    lines,
    words,
    chars,
    exists
  };
};

const isFileExists = fileDetails => fileDetails.exists;

const getTotalCountsObj = function (fileDetailsObjects) {
  let totalObject = getDefaultFileDetails("total", 0);
  totalObject.exists = true;
  fileDetailsObjects = fileDetailsObjects.filter(isFileExists); //remove not existing files
  return fileDetailsObjects.reduce(addFileDetails, totalObject);
};

const count = function (args, fs) {
  let {
    counts,
    fileNames
  } = parse(args);
  const fileDetailsObjects = fileNames.map(
    getFileDetails.bind(null, fs, counts)
  );
  if (fileNames.length > 1) {
    let totalObj = getTotalCountsObj(fileDetailsObjects);
    fileDetailsObjects.push(totalObj);
  }
  return fileDetailsObjects.map(formatOutput).join("\n");
};

module.exports = {
  count,
  getFileDetails
};