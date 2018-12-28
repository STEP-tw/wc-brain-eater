const { parse, getOptionArgs } = require("../src/parse");
const { deepEqual } = require("assert");

describe("parse", function() {
  it("should return all options and fileName when only file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words", "chars"],
      fileNames: ["file"]
    };
    let actualOutput = parse(["file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given option and fileName when option and file name is given", function() {
    let expectedOutput = {
      options: ["lines"],
      fileNames: ["file"]
    };
    let actualOutput = parse(["-l", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options and fileName when options and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      fileNames: ["file"]
    };
    let actualOutput = parse(["-lw", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options and fileName when multiple options  given seperately  and file name is given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      fileNames: ["file"]
    };
    let actualOutput = parse(["-l", "-w", "file"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return given options and fileNames when multiple options  given seperately  and file names are given", function() {
    let expectedOutput = {
      options: ["lines", "words"],
      fileNames: ["file1", "file2"]
    };
    let actualOutput = parse(["-l", "-w", "file1", "file2"]);
    deepEqual(expectedOutput, actualOutput);
  });
});

describe("getOptionArgs", function() {
  it("should return optionArgs when arguments are given ", function() {
    let expectedOutput = ["-l", "-c"];
    let actualOutput = getOptionArgs(["-l", "-c", "Tilak"]);
    deepEqual(expectedOutput, actualOutput);
  });

  it("should return optionArgs which are present only in the starting of arguments when arguments are given ", function() {
    let expectedOutput = ["-l", "-c"];
    let actualOutput = getOptionArgs(["-l", "-c", "Tilak", "-w"]);
    deepEqual(expectedOutput, actualOutput);
  });
});
