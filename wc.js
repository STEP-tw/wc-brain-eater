const { wc } = require("./src/lib");
const fs = require("fs");

const main = function() {
  let args = process.argv.slice(2);
  wc(args, fs, console);
};

main();
