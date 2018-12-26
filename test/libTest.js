const { equal, deepEqual } = require("assert");
const { count } = require("../src/lib");

const fs = {
  readFileSync: function(fileName, encoding) {
    return "This is a file\nIt is used for Testing\n wc";
  }
};

describe("count", function() {
  it("should return line,word and character counts when a single file is given ", function() {
    const actualOutput = count("file", fs);
    const expectedOutput = "2\t10\t41 file";
    equal(actualOutput, expectedOutput);
  });
});
