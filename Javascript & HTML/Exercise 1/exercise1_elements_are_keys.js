/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function MultiSet() {
  this.elements = {};
  this.count = 0;
};

MultiSet.prototype.add = function (element, occurrences) {
  if (occurrences === undefined) {
    occurrences = 1;
  }
  if (this.elements.hasOwnProperty(element)) {
    var multiplicity = this.elements[element];
    this.elements[element] = multiplicity + occurrences;
  } else {
    this.elements[element] = occurrences;
    console.log(this.elements);
  }
  this.count = this.count + occurrences;
};

MultiSet.prototype.remove = function (element, occurrences) {
  if (occurrences === undefined) {
    occurrences = 1;
  }
  if (this.elements.hasOwnProperty(element)) {
    var multiplicity = this.elements[element];
    this.elements[element] = multiplicity + occurrences;
  } else {
    return false;
  }
  this.count = this.count + occurrences;
};

MultiSet.prototype.count = function () {
  return this.count;
};

var multiSet = new MultiSet();

multiSet.add(5);
multiSet.add(2, 2);
multiSet.add('b', 2);
multiSet.add('c', 5);

