const { isIncludes } = require("./utils");

const isOption = x => x.startsWith("-");

const splitOptions = function(options) {
  return options.slice(1).split("");
};

const concat = (list1, list2) => list1.concat(list2);

const toLinear = function(matrix) {
  return matrix.reduce(concat);
};

const toLongOption = function(shortOption) {
  const longOptions = {
    l: "lines",
    w: "words",
    c: "chars"
  };
  return longOptions[shortOption];
};

const getOptionArgs = function(args) {
  let optionArgs = [];
  let argIndex = 0;
  while (isOption(args[argIndex])) {
    let argument = args[argIndex];
    optionArgs.push(argument);
    argIndex++;
  }
  return optionArgs;
};

const parseOptions = function(optionArgs) {
  let parsedOptions = optionArgs.map(splitOptions);
  parsedOptions = toLinear(parsedOptions);
  let allOptions = ["l", "c", "w"];
  parsedOptions = allOptions.filter(isIncludes.bind(null, parsedOptions)); //will get sorted and removes duplicate elements
  return parsedOptions.map(toLongOption);
};

const parse = function(args) {
  let firstArg = args[0];
  let fileNames = args;
  let counts = ["lines", "words", "chars"];
  if (isOption(firstArg)) {
    let optionArgs = getOptionArgs(args);
    counts = parseOptions(optionArgs);
    let fileNameIndex = optionArgs.length;
    fileNames = args.slice(fileNameIndex);
  }
  return {
    counts,
    fileNames
  };
};

module.exports = {
  parse,
  getOptionArgs
};
