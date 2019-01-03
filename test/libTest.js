const { equal, deepEqual } = require("assert");
const { wc } = require("../src/lib");

const fs = {
  files: {
    file1: "This is a  file\nIt is used for Testing\n wc",
    file2: "This\nis\nfile2",
    emptyFile: ""
  },
  readFile: function(fileName, encoding, callback) {
    callback(null, this.files[fileName]);
  }
};

const getLogger = function() {
  return {
    text: "",
    delimiter: "",
    log: function(string) {
      this.text = this.text + this.delimiter + string;
      this.delimiter = "\n";
    }
  };
};

describe("wc", function() {
  describe("single file", function() {
    let logger;
    beforeEach(function() {
      logger = getLogger();
      console.log(logger);
    });

    it("should return line,word and character counts when a single file is given ", function() {
      wc(["file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2\t10\t42 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return line,word and character counts as 0 when a empty file is given ", function() {
      wc(["emptyFile"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "0\t0\t0 emptyFile";
      equal(actualOutput, expectedOutput);
    });

    it("should return line count when a single file and -l as option is given ", function() {
      wc(["-l", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return character count when a single file and -c as option is given ", function() {
      wc(["-c", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "42 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return word count when a single file and -w as option is given ", function() {
      wc(["-w", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "10 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return counts based on given options when a single file and two options together is given ", function() {
      wc(["-lw", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2\t10 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return counts based on given options when a single file and multiple options together is given ", function() {
      wc(["-wlc", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2\t10\t42 file1";
      equal(actualOutput, expectedOutput);
    });

    it("should return  counts based on given options and fileName when multiple options  given seperately  and file name is given", function() {
      wc(["-w", "-l", "-c", "file1"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2\t10\t42 file1";
      equal(actualOutput, expectedOutput);
    });
  });

  describe("multipleFiles", function() {
    let logger;
    beforeEach(function() {
      logger = getLogger();
      console.log(logger);
    });

    it("should return defaults counts when a multiple files are given ", function() {
      wc(["file1", "file2"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2\t10\t42 file1\n2\t3\t13 file2\n4\t13\t55 total";
      equal(actualOutput, expectedOutput);
    });

    it("should return line count when a multiple files and -l as option is given ", function() {
      wc(["-l", "file1", "file2"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "2 file1\n2 file2\n4 total";
      equal(actualOutput, expectedOutput);
    });

    it("should return character count when a multiple files and -c as option is given ", function() {
      wc(["-c", "file1", "file2"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "42 file1\n13 file2\n55 total";
      equal(actualOutput, expectedOutput);
    });

    it("should return word count when a multiple files and -w as option is given ", function() {
      wc(["-w", "file1", "file2"], fs, logger);
      const actualOutput = logger.text;
      const expectedOutput = "10 file1\n3 file2\n13 total";
      equal(actualOutput, expectedOutput);
    });
  });
});
