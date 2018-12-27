const concat = function(object1, object2) {
  return Object.assign(object1, object2);
};

const isIncludes = function(list, element) {
  return list.includes(element);
};

module.exports = {
  concat,
  isIncludes
};
