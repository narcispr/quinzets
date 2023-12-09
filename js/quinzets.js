function updateTimer() {
    var timerElement = document.getElementById('timer');
    if (timerElement.innerHTML == "-") {
        return;
    }
    var time_left = parseInt(timerElement.innerHTML, 10);
    timerElement.innerHTML = time_left - 1;
    if (time_left <= 0) {
        timerElement.innerHTML = "-";
        check();
    }
}

function startTimer() {
    setInterval(updateTimer, 1000);
}

window.onload = startTimer; // Start the timer when the page loads

function clip(value, level) {
    var min = 1;
    var max = 10;
    if (level == 0) {
        max = 6;
    }
    if (level == 1) {
        min = 2;
        max = 7;
    }
    if (level > 1) {
        min = 2;
        max = 10;
    }
    return Math.min(Math.max(value, min), max);
}

//Create generate function that fills a div with 20 random muliplications like 3 x 7 = ____ where ____ is a HTML input field. Include also the correct answer in a hidden field.
function generate() {
    var cols = ['col1', 'col2', 'col3', 'col4']
    var j = 0;
    var sums = document.getElementById('sums').checked;
    var subs = document.getElementById('subs').checked;
    var divs = document.getElementById('divs').checked;
    var mults = document.getElementById('mults').checked;
    var twodigits = document.getElementById('twoDigits').checked;
    if (!sums && !subs && !divs && !mults) {
        alert("Please select at least one operation");
        return;
    }
    var col_n = 0;
    for (var col of cols) {       
        var div = document.getElementById(col);
        div.innerHTML = "";
        for (var i = 0; i < 15; i++) {
            if (twodigits) {
                var a = Math.ceil(Math.random() * 100);
                var b = Math.ceil(Math.random() * 100);
            }
            else {
                var a = Math.ceil(Math.random() * 10);
                var b = Math.ceil(Math.random() * 10);
                // truncate value according column  
                a = clip(a, col_n);
                b = clip(b, col_n);
            }
            var c = 0;
            var symbol = "";
            // randomly generate and integer between 0 and 3 whre 0 --> sums, 1 --> subs, 2 -->divs, 3 -->mults
            // if the operation choosen is not true, repeat
            opertion = -1;
            while (opertion == -1) {
                var op = Math.floor(Math.random() * 4);
                if (op == 0 && sums) {
                    opertion = 0;
                } else if (op == 1 && subs) {
                    opertion = 1;
                } else if (op == 2 && divs) {
                    opertion = 2;
                } else if (op == 3 && mults) {
                    opertion = 3;
                }
            }
            if (opertion == 0) {
                c = a + b;
                symbol = "+";
            }
            if (opertion == 1) {
                if (a < b) {
                    var temp = a;
                    a = b;
                    b = temp;
                }
                c = a - b;
                symbol = "-";
            }
            if (opertion == 2) {
                c = a * b;
                tmp = c;
                c = a;
                a = tmp;
                symbol = "/";
            }
            if (opertion == 3) {
                c = a * b;
                symbol = "x";
            }
            var p = document.createElement("p");
            p.innerHTML = a + " " + symbol + " " + b + "&emsp;=&emsp;<input type='text' size='2' id='answ_" + j + "' /> <input type='hidden' value='" + c + "' id='sol_" + j+ "' />";
            div.appendChild(p);
            j++;
        }
        col_n++;
    }
    //Set the labet timer to 2 minutes also
    var timer = document.getElementById('timer');
    var total = document.getElementById('totalTime');
    var scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = "-";
    timer.innerHTML = total.value;
}

//Create a function check that checks the answers and shows the score
function check() {
    var score = 0;
    for (var i = 0; i < 60; i++) {
        var sol = document.getElementById('sol_' + i);
        var inp = document.getElementById('answ_' + i);
        if (sol.value == inp.value) {
            score++;
        }
        else {
            inp.style.backgroundColor = "red";
        }
    }
    var scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = score + "/60";
    var timerElement = document.getElementById('timer');
    timerElement.innerHTML = "-"
    //show alert wondows with score
    alert("La teva puntució és " + score + "/60");
}