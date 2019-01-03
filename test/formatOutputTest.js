const { equal } = require("assert");
const { formatOutput } = require("../src/formatOutput");

describe("formatOutput", function() {
  it("should return formatted output when fileDetails are given ", function() {
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

  it("should return formatted output when fileDetails with only few details  are given ", function() {
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
});
