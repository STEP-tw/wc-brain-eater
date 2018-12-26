const isOption = x => x.startsWith("-");

const splitOptions = function(options) {
  return options.slice(1).split("");
};

const concat = (list1, list2) => list1.concat(list2);

const toLinear = function(matrix) {
  return matrix.reduce(concat);
};

const parseOptions = function(optionArgs) {
  let parsedOptions = optionArgs.map(splitOptions);
  parsedOptions = toLinear(parsedOptions);
  return parsedOptions;
};

const parse = function(args) {
  let firstArg = args[0];
  let fileName = firstArg;
  let options = ["l", "w", "c"];
  if (isOption(firstArg)) {
    let optionArgs = args.filter(isOption);
    options = parseOptions(optionArgs);
    let fileNameIndex = optionArgs.length;
    fileName = args[fileNameIndex];
  }
  return { options, fileName };
};

module.exports = { parse };
