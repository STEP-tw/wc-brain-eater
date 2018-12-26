const { equal, deepEqual } = require("assert");
const { count } = require("../src/lib");

const fs = {
  files: {
    file1: "This is a file\nIt is used for Testing\n wc",
    file2: "This\nis\nfile2"
  },
  readFileSync: function(fileName, encoding) {
    return this.files[fileName];
  }
};

describe("count", function() {
  describe("single file", function() {
    it("should return line,word and character counts when a single file is given ", function() {
      const actualOutput = count(["file1"], fs);
      const expectedOutput = "2\t10\t41 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return line count when a single file and -l as option is given ", function() {
      const actualOutput = count(["-l", "file1"], fs);
      const expectedOutput = "2 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return character count when a single file and -c as option is given ", function() {
      const actualOutput = count(["-c", "file1"], fs);
      const expectedOutput = "41 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return word count when a single file and -w as option is given ", function() {
      const actualOutput = count(["-w", "file1"], fs);
      const expectedOutput = "10 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return counts based on given options when a single file and two options together is given ", function() {
      const actualOutput = count(["-lw", "file1"], fs);
      const expectedOutput = "2\t10 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return counts based on given options when a single file and multiple options together is given ", function() {
      const actualOutput = count(["-wlc", "file1"], fs);
      const expectedOutput = "2\t10\t41 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return  counts based on given options and fileName when multiple options  given seperately  and file name is given", function() {
      const actualOutput = count(["-w", "-l", "-c", "file1"], fs);
      const expectedOutput = "2\t10\t41 file1";
      equal(actualOutput, expectedOutput);
    });
  });

  describe("multipleFiles", function() {
    it("should return defaults counts when a multiple files are given ", function() {
      const actualOutput = count(["file1", "file2"], fs);
      const expectedOutput = "2\t10\t41 file1\n2\t3\t13 file2";
      equal(actualOutput, expectedOutput);
    });

    it("should return line count when a multiple files and -l as option is given ", function() {
      const actualOutput = count(["-l", "file1", "file2"], fs);
      const expectedOutput = "2 file1\n2 file2";
      equal(actualOutput, expectedOutput);
    });

    it("should return character count when a multiple files and -c as option is given ", function() {
      const actualOutput = count(["-c", "file1", "file2"], fs);
      const expectedOutput = "41 file1\n13 file2";
      equal(actualOutput, expectedOutput);
    });

    it("should return word count when a multiple files and -w as option is given ", function() {
      const actualOutput = count(["-w", "file1", "file2"], fs);
      const expectedOutput = "10 file1\n3 file2";
      equal(actualOutput, expectedOutput);
    });
  });
});
