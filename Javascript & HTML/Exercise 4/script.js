var numList = [];
var numbers;
var score = 0;

window.onload = function() {
    numbers = document.querySelectorAll(".number");
    init();
}

function init() {
    randomize();
    updateScore();
    var dragSrcEl = null;
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].innerHTML = numList[i];
    }
    [].forEach.call(numbers, function(number) {
        number.addEventListener("dragstart", handleDragStart, false);
        number.addEventListener("drop", handleDrop, false);
        number.addEventListener('dragover', handleDragOver, false);
    });
}

function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }
    win();
    return false;
}

function randomize() {
    for ( var i = 0; i < 10; i++) {
        numList[i] = Math.floor(Math.random()* 50 + 1);
    }
}

function win() {
    numbers = document.querySelectorAll(".number");
    var attemptNumbers = [];
    var sorted = true;
    for (var i = 0; i < numbers.length; i++) {
        attemptNumbers[i] = Number(numbers[i].innerHTML);
    }
    for (var i = 0; i < attemptNumbers.length - 1; i++) {
        if (attemptNumbers[i] > attemptNumbers[i + 1]) {
            sorted = false;
            break;
        }
    }
    if (sorted) {
        console.log("won");
        score++;
        alert("You won!");
        init();
    }
}

function updateScore() {
    localStorage.setItem("score", score);
    document.getElementById("score").innerHTML = "Score: " + localStorage.getItem("score");
}