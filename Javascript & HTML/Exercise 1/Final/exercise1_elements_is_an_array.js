function MultiSet() {
  this.elements = [];
};

MultiSet.prototype.add = function (element, occurrences) {
  if (occurrences === undefined) {
    occurrences = 1;
  }
  for (var i = 0; i < occurrences; i++) {
    this.elements.push(element);
  }
};

MultiSet.prototype.remove = function (element, occurrences) {
  if (occurrences === undefined) {
    occurrences = 1;
  }
  var index = this.elements.indexOf(element);
  if(index > -1) {
    for (var i = 0; i < occurrences; i++) {
      this.elements.splice(index, 1);
    }
  }
};

// MultiSet.prototype.contains = function(element) {
//   for (var i = 0; i < this.elements.length; i++) {
//     if(element.equals(this.elements[i])) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

MultiSet.prototype.contains = function(element) {
  for (var i = 0; i < this.elements.length; i++) {
    if(element === this.elements[i]) {
      return true;
    }
  }
  return false;
}

MultiSet.prototype.toString = function () {
  var output ="[";
  for (var i = 0; i < this.elements.length; i++) {
    var element = this.elements[i];
    if (typeof element === "object" && !Array.isArray(element)) {
      var string = [];
      for (let prop in element) {
        if (element.hasOwnProperty(prop))
          string.push(prop + ": " + element[prop]);
      };
      output += "{" + string.join(",") + "}, ";
    } else if (Array.isArray(element)) {
      output += "[" + element + "], ";
    }
    else {
      output += element + ", ";
    }
  };
  output = output.slice(0, -2);
  output += ']';
  return output;
}

MultiSet.prototype.count = function () {
  return this.elements.length;
};

var multiSet = new MultiSet();

multiSet.add("hi", 2);

function clickAdd() {
  var Add = document.getElementById("Add");
  let Occ = document.getElementById("addOcc");
  multiSet.add(Add.value, Occ.value);
  document.getElementById("show").innerHTML = multiSet.toString();
}

function clickRemove() {
  var Remove = document.getElementById("Remove");
  let Occ = document.getElementById("removeOcc");
  multiSet.remove(Remove.value, Occ.value);
  document.getElementById("show").innerHTML = multiSet.toString();
}

function clickContains() {
  var Contains = document.getElementById("Contains");
  document.getElementById("show").innerHTML = multiSet.contains(Contains.value);
}

function clickCount() {
  document.getElementById("show").innerHTML = multiSet.count();
}




