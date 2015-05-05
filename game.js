function handler(e)
{
    e = e || window.event;
    var target=e.target;
    if(target.className.match('card')&& !target.className.match('used'))
    {
        if(first==null)
        {
            first=target;
            first.valoare=target.innerHTML;
            first.className+=" selected";
        }
        else if(second==null)
        {
            second=target;
            second.valoare=target.innerHTML;
            second.className+=" selected";
            if(first.valoare==second.valoare)
            {
                first.className="card used";
                second.className="card used";
                first=null;
                second=null;
            }
            else
            {
                first.className="card";
                second.className="card";
                first=null;
                second=null;
            }
        }
        
    }
}
var first=null;
var second=null;
var gamepanel = document.getElementById('gamebody');
gamepanel.addEventListener('click', handler, false);
