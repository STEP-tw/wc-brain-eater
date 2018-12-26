const { equal, deepEqual } = require("assert");
const { count } = require("../src/lib");

const fs = {
  readFileSync: function(fileName, encoding) {
    return "This is a file\nIt is used for Testing\n wc";
  }
};

describe("count", function() {
  it("should return line,word and character counts when a single file is given ", function() {
    const actualOutput = count(["file"], fs);
    const expectedOutput = "2\t10\t41 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return line count when a single file and -l as option is given ", function() {
    const actualOutput = count(["-l", "file"], fs);
    const expectedOutput = "2 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return character count when a single file and -c as option is given ", function() {
    const actualOutput = count(["-c", "file"], fs);
    const expectedOutput = "41 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return word count when a single file and -w as option is given ", function() {
    const actualOutput = count(["-w", "file"], fs);
    const expectedOutput = "10 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return counts based on given options when a single file and two options together is given ", function() {
    const actualOutput = count(["-lw", "file"], fs);
    const expectedOutput = "2\t10 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return counts based on given options when a single file and multiple options together is given ", function() {
    const actualOutput = count(["-wlc", "file"], fs);
    const expectedOutput = "10\t2\t41 file";
    equal(actualOutput, expectedOutput);
  });

  it("should return given options and fileName when multiple options  given seperately  and file name is given", function() {
    const actualOutput = count(["-w", "-l", "-c", "file"], fs);
    const expectedOutput = "10\t2\t41 file";
    equal(actualOutput, expectedOutput);
  });
});
