const isOption = x => x.startsWith("-");

const parse = function(args) {
  let [firstArg, secondArg] = args;
  let fileName = firstArg;
  let options = ["l", "w", "c"];
  if (isOption(firstArg)) {
    options = firstArg.slice(1).split("");
    fileName = secondArg;
  }
  return { options, fileName };
};

module.exports = { parse };
