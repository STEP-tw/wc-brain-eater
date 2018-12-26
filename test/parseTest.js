const { parse } = require("../src/parse");
const { deepEqual } = require("assert");

describe("parse", function() {
  it("should return all options and fileName when only file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words", "chars"],
      fileName: "file"
    };
    let actualOutput = parse(["file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given option and fileName when option and file name is given", function() {
    let expectedOutput = {
      options: ["lines"],
      fileName: "file"
    };
    let actualOutput = parse(["-l", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options and fileName when options and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      fileName: "file"
    };
    let actualOutput = parse(["-lw", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options and fileName when multiple options  given seperately  and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      fileName: "file"
    };
    let actualOutput = parse(["-l", "-w", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });
});
