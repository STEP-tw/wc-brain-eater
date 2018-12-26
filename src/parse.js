const isOption = x => x.startsWith("-");

const parse = function(args) {
  let [firstArg, secondArg] = args;
  let fileName = firstArg;
  let options = ["l", "w", "c"];
  if (isOption(firstArg)) {
    let option = firstArg[1];
    options = [option];
    fileName = secondArg;
  }
  return { options, fileName };
};

module.exports = { parse };
