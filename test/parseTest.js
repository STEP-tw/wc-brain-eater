const { parse } = require("../src/parse");
const { deepEqual } = require("assert");

describe("parse", function() {
  it("should return all options and fileName when only file name is given", function() {
    let expectedOutput = {
      options: ["l", "w", "c"],
      fileName: "file"
    };
    let actualOutput = parse(["file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given option when option and file name is given", function() {
    let expectedOutput = {
      options: ["l"],
      fileName: "file"
    };
    let actualOutput = parse(["-l", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options when options and file name is given", function() {
    let expectedOutput = {
      options: ["l", "w"],
      fileName: "file"
    };
    let actualOutput = parse(["-lw", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });
});
