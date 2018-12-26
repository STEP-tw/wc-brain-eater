const TAB = "\t";
const NEWLINE = "\n";
const EMPTY = "";
const SPACE = " ";

const isNotEmpty = string => string != EMPTY;

const isUndefined = ele => ele != undefined;

const replace = function(text, stringToReplace, replacingString) {
  return text.split(stringToReplace).join(replacingString);
};

module.exports = {
  TAB,
  EMPTY,
  NEWLINE,
  SPACE,
  isNotEmpty,
  isUndefined,
  replace
};
