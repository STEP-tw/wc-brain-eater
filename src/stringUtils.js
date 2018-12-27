const TAB = "\t";
const NEWLINE = "\n";
const EMPTY = "";
const SPACE = " ";

const isNotEmpty = string => string != EMPTY;

const replace = function(text, stringToReplace, replacingString) {
  return text.split(stringToReplace).join(replacingString);
};

module.exports = {
  TAB,
  EMPTY,
  NEWLINE,
  SPACE,
  isNotEmpty,
  replace
};
