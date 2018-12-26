const isOption = x => x.startsWith("-");

const splitOptions = function(options) {
  return options.slice(1).split("");
};

const concat = (list1, list2) => list1.concat(list2);

const toLinear = function(matrix) {
  return matrix.reduce(concat);
};

const compareOptions = function(option1, option2) {
  let optionsOrder = {
    l: 1,
    w: 2,
    c: 3
  };
  return optionsOrder[option1] - optionsOrder[option2];
};

const toLongOption = function(shortOption) {
  const longOptions = {
    l: "line",
    w: "word",
    c: "char"
  };
  return longOptions[shortOption] || shortOption;
};

const parseOptions = function(optionArgs) {
  let parsedOptions = optionArgs.map(splitOptions);
  parsedOptions = toLinear(parsedOptions);
  parsedOptions = parsedOptions.sort(compareOptions);
  return parsedOptions.map(toLongOption);
};

const parse = function(args) {
  let firstArg = args[0];
  let fileName = firstArg;
  let options = ["line", "word", "char"];
  if (isOption(firstArg)) {
    let optionArgs = args.filter(isOption);
    options = parseOptions(optionArgs);
    let fileNameIndex = optionArgs.length;
    fileName = args[fileNameIndex];
  }
  return { options, fileName };
};

module.exports = { parse };
