const { count } = require("./src/lib");
const fs = require("fs");

const main = function() {
  let args = process.argv.slice(2);
  console.log(count(args, fs));
};

main();
