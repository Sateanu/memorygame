/* global winGame */
Array.prototype.shuffle = function () {
    var temp, j, i;
    for (temp, j, i = this.length; i;) {
        j = Math.floor(Math.random() * i);
        temp = this[--i];
        this[i] = this[j];
        this[j] = temp;
    }
}
function winGame(text) {
    var movingWin = document.createElement('div');
    movingWin.style.position = 'fixed';
    movingWin.style.top = Math.floor(Math.random() * 80) + "%";
    movingWin.style.overflow = 'hidden';
    movingWin.style.display = 'block';
    movingWin.style.background = "black";
    movingWin.style.color = 'white';
    movingWin.X = 0;
    movingWin.style.marginLeft = movingWin.X + "px";
    var winString = text != undefined ? text : 'YOU WON!\nDin ' + incercari + " incercari cu o sansa de "
        + (incercariCorecte * 100 / incercari).toFixed(2) + "% ("
        + ((new Date() - dateStart) / 1000) + " s ) !";
    movingWin.innerHTML = winString;
    movingWin.lastFrame = +new Date;
    document.body.appendChild(movingWin);
    movingWin.interval = setInterval(function (movingWin) {
        var now = +new Date;
        var delta = now - movingWin.lastFrame;
        movingWin.X += 2 * delta / 16;
        movingWin.style.marginLeft = movingWin.X + "px";
        movingWin.lastFrame = now;
    }, 16, movingWin);
    setTimeout(function (movingWin, text) {
        clearInterval(movingWin.interval);
        document.body.removeChild(movingWin);
        winGame(text);
    }, 5000, movingWin, winString);
    //alert('YOU WON!\nDin ' + incercari + " incercari cu o sansa de " + (incercariCorecte * 100 / incercari).toFixed(2) + "% !");
}
function handler(e) {
    e = e || window.event;
    var target = e.target;
    if (target.className.match('card') && !target.className.match('used')) {
        if (first == null) {
            first = target;
            //first.valoare = target.innerHTML;
            first.className = "card selected";
            if (checkBox.checked) {
                document.getElementById('dank_hit').currentTime=0;
                document.getElementById('dank_hit').play();
            }
        }
        else if (second == null && first != target) {
            second = target;
            incercari++;
            if (checkBox.checked) {
                document.getElementById('dank_hit').currentTime=0;
                document.getElementById('dank_hit').play();
            }
            //second.valoare = target.innerHTML;
            second.className = "card selected";
            if (first.valoare == second.valoare) {
                if (checkBox.checked) {
                    document.getElementById('dank_score').currentTime=0;
                    document.getElementById('dank_score').play();
                }
                incercariCorecte++;
                first.className = "card used";
                second.className = "card used";
                first = null;
                second = null;
                perechiramase--;
                if (perechiramase == 0) {
                    if (checkBox.checked) {
                        document.getElementById('dank_win').currentTime=0;
                        document.getElementById('dank_win').play();
                    }
                    winGame();
                }
            }
            else {
                setTimeout(function () {
                    first.className = "card";
                    second.className = "card";
                    first = null;
                    second = null;
                    if (checkBox.checked) {
                        document.getElementById('dank_miss').currentTime=0;
                        document.getElementById('dank_miss').play();
                    }
                }, 500);

            }
        }

    }
}

var pict = {
    0: 'pict0.png',
    1: 'pict1.png',
    2: 'pict2.png',
}
var nivele = [
    { x: 2, y: 3 },
    { x: 4, y: 5 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 },
    { x: 9, y: 10 },
];
var incercari = 0;
var incercariCorecte = 0;
var first = null;
var second = null;
var gamepanel = document.getElementById('gamebody');
var perechiramase = 0;
var checkBox = null;
gamepanel.addEventListener('click', handler, false);
var dateStart;
var dateEnd;
function createTable(level) {

    dateStart = new Date();
    first = null;
    second = null;
    incercari = 0;
    incercariCorecte = 0;
    if (nivele[level] == null)
        return 0;

    var table = document.getElementById('cardtable');
    if (table == null) {
        table = document.createElement("table");
        table.id = "cardtable";
        gamepanel.appendChild(table);
    }
    else
        table.innerHTML = "";


    var x = nivele[level].x;
    var y = nivele[level].y;
    var cards = x * y;
    var cardValors = Array();
    perechiramase = x * y / 2;
    for (var i = 0; i < cards / 2; i++) {
        cardValors.push(i);
        cardValors.push(i);
    }

    cardValors.shuffle();

    for (var i = 0; i < x; i++) {
        var row = document.createElement('tr');

        table.appendChild(row);
        for (var j = 0; j < y; j++) {
            var td = document.createElement('td');
            row.appendChild(td);
            var card = document.createElement('div');
            card.className = "card";
            /*
                        card.onmouseover = (function (e) {
                            this.oldstyle = this.style;
                            this.oldbg = this.style.scale;
                            this.style.background = "#99C";
                        });
                        card.onmouseleave = (function () {
                            if (this.oldstyle)
                                this.style.background = this.oldbg;
                        });
            */
            var cardContainer = document.createElement('div');
            cardContainer.setAttribute("style", "webkit-transform=rotateY(-180deg)");
            cardContainer.style.transform = "rotateY(-180deg)";
            
            
            //TO-DO: IMPROVE GENERATION
            card.valoare = cardValors[i * y + j];
            
            //TO-DO: REMOVE INNER HTML AND ADD A IMG BASED ON VALOARE
            card.innerHTML = card.valoare;
            cardContainer.appendChild(card);
            td.appendChild(cardContainer);
        }
        table.appendChild(row);
    }
    return 0;
}

window.onload = (function () {

    var menu = document.getElementById('menu');
    for (var i = 0; i < nivele.length; i++) {
        var b = document.createElement('input');
        b.type = 'button';
        b.value = 'Level ' + (i + 1);
        b.level = i;
        b.style.margin = '2px';
        b.onclick = (function () {
            createTable(this.level);
        });
        b.onmouseover = (function (e) {
            this.oldstyle = this.style;
            this.oldbg = this.style.background;
            this.style.background = "#99C";
        });
        b.onmouseleave = (function () {
            if (this.oldstyle)
                this.style.background = this.oldbg;
        });
        menu.appendChild(b);
    }
    if (checkBox == null) {
        var label = document.createElement('label');
        label.innerHTML = "DANK ";

        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        label.appendChild(checkBox);
        menu.appendChild(label);


    }
});
document.onkeypress = (function (key) {
    var code = (String.fromCharCode(key.which) || String.fromCharCode(key.keyCode));
    var level = parseInt(code);
    if (level) {
        createTable(level - 1);
    }
});
