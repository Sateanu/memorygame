function handler(e) {
    e = e || window.event;
    var target = e.target;
    if (target.className.match('card') && !target.className.match('used')) {
        if (first == null) {
            first = target;
            //first.valoare = target.innerHTML;
            first.className = "card selected";
        }
        else if (second == null && first != target) {
            second = target;
            //second.valoare = target.innerHTML;
            second.className = "card selected";
            if (first.valoare == second.valoare) {
                first.className = "card used";
                second.className = "card used";
                first = null;
                second = null;
            }
            else {
                first.className = "card";
                second.className = "card";
                first = null;
                second = null;
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
    { x: 4, y: 5 },
    { x: 5, y: 6 },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 },
    { x: 10, y: 10 },
];

var first = null;
var second = null;
var gamepanel = document.getElementById('gamebody');

gamepanel.addEventListener('click', handler, false);

function createTable(level) {

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

    for (var i = 0; i < x; i++) {
        var row = document.createElement('tr');
        table.appendChild(row);
        for (var j = 0; j < y; j++) {
            var td = document.createElement('td');
            row.appendChild(td);
            var card = document.createElement('div');
            card.className = "card";
            //TO-DO: IMPROVE GENERATION
            card.valoare = Math.floor(Math.random() * 10);
            //TO-DO: REMOVE INNER HTML AND ADD A IMG BASED ON VALOARE
            card.innerHTML = card.valoare;

            td.appendChild(card);
        }
        table.appendChild(row);
    }
    return 0;
}

window.onload = (function () {
    
    var menu=document.getElementById('menu');
    for (var i = 0; i < nivele.length; i++) {
        var b = document.createElement('input');
        b.type = 'button';
        b.value = i + 1;
        b.level = i;
        b.onclick = (function () {
            createTable(this.level);
        });
        menu.appendChild(b);
    }
});