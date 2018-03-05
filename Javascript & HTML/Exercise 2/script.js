var toppings = {};
var elements;
var toppingCount = 0;
var warnings = [];

function getToppings () {
    for (var i = 0; i < elements.length; i++) {
        console.log("value: " + elements[i].value + " i: " + i);
        if (elements[i].checked === true) {
            toppings[elements[i].id] = elements[i].value;
        }
        else {
            toppings[elements[i]] = "off";
        }
    }
}

function maxTopping () {
    toppingCount = 0;
    warnings[0] = "";
    document.getElementById("warnings").innerHTML = "";
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked === true) {
            toppingCount++;
        }
    }
    console.log("toppingCOunt: " + toppingCount);
    if (toppingCount > 3) {
        warnings[0] = "Select only at most 3 toppings please!";
        document.getElementById("warnings").innerHTML = warnings[0] + "<br>";
        console.log(document.getElementById("warnings").innerHTML);
        return false; //change to false
    } else {
        return true;
    }
}

function messy() {
    warnings[1]  = "";
    document.getElementById("warnings").innerHTML = "";
    if (document.getElementById("strawberry_syrup").checked === true && document.getElementById("caramel_sauce").checked === true) {
        console.log("Do not select both Strawberry syrup and Caramel sauce please!");
        warnings[1] = "Do not select both Strawberry syrup and Caramel sauce please!";
        document.getElementById("warnings").innerHTML = warnings[0] + "<br>" + warnings[1];
    }
}

function sendData () {
    if(maxTopping()) {
        if(messy()) {
            //submit data to server
        } else {
            alert("Do not select both Strawberry syrup and Caramel sauce please!")
            clear();
            //do not submit data to server
        }
    } else {
        alert("Select only at most 3 toppings please!")
        clear();
        //do not submit data to server
    }
}

function clear() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;  
    }
    document.getElementById("warnings").innerHTML = "";
}

function init() {
    elements = document.querySelectorAll("#form input[type=checkbox]");
    getToppings();
    sendData();
    return false;
}

window.onload = function() {
    elements = document.querySelectorAll("#form input[type=checkbox]")
}