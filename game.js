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
var first = null;
var second = null;
var gamepanel = document.getElementById('gamebody');
gamepanel.addEventListener('click', handler, false);

function createTable(noPairs) {
    
    noPairs=parseInt(noPairs);
    var table=document.getElementById('cardtable');
    if(table==null){ 
        table = document.createElement("table");
        table.id="cardtable";
        gamepanel.appendChild(table);
    }
    else
        table.innerHTML="";
    

    var cards = noPairs * 2;
    var tc = cards;
    var x = cards;
    while (x % 2 == 0)
        var x = x / 2;
        
    var y = cards / x;
    
    for (i = 0; i < x; i++) {
            var row=document.createElement('tr');
            table.appendChild(row);
        for (j = 0; j < y; j++) {
            var td=document.createElement('td');
            row.appendChild(td);
            var card = document.createElement('div');
            card.className = "card";
            //TO-DO: IMPROVE GENERATION
            card.valoare=Math.floor(Math.random()*10);
            //TO-DO: REMOVE INNER HTML AND ADD A IMG BASED ON VALOARE
            card.innerHTML=card.valoare;
            td.appendChild(card);
        }
        table.appendChild(row);
    }
    return 0;
}

function playGame() {
    var p=document.getElementById('pair');
    createTable(parseInt(p.value));
}