const { equal, deepEqual } = require("assert");
const { replace } = require("../src/stringUtils");

describe("replace", function() {
  it("should return replaced text when text , replacing char and char to replace is given", function() {
    let text = "hi This is a text";
    let expectedOutput = "he Thes es a text";
    let actualOutput = replace(text, "i", "e");
    equal(expectedOutput, actualOutput);
  });

  it("should return replaced text when text , replacing string and string to replace is given", function() {
    let text = "hi hello hi hello hi";
    let expectedOutput = "hello hello hello hello hello";
    let actualOutput = replace(text, "hi", "hello");
    equal(expectedOutput, actualOutput);
  });
});
