const {
  equal
} = require("assert");
const {
  formatOutput
} = require("../src/formatOutput");

describe("formatOutput", function () {
  it("should return formatted output when fileDetails are given ", function () {
    const fileDetails = {
      lines: 3,
      words: 10,
      chars: 20,
      name: "file",
      exists: true
    };
    const expectedOutput = "3\t10\t20 file";
    const actualOutput = formatOutput(fileDetails);
    equal(expectedOutput, actualOutput);
  });

  it("should return formatted output when fileDetails with only few details  are given ", function () {
    const fileDetails = {
      lines: 3,
      chars: 20,
      name: "file",
      exists: true
    };
    const expectedOutput = "3\t20 file";
    const actualOutput = formatOutput(fileDetails);
    equal(expectedOutput, actualOutput);
  });

  it("should return file not found error if fileDetails with exists false is given ", function () {
    const fileDetails = {
      lines: undefined,
      chars: undefined,
      name: "file",
      exists: false
    };
    const expectedOutput = "wc: file: open: No such file or directory";
    const actualOutput = formatOutput(fileDetails);
    equal(expectedOutput, actualOutput);
  });
});