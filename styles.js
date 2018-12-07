var is_night_mode = false;
var style = document.getElementById("style");

function update_css()
{
    if(is_night_mode)
    {
        style.href = "style_black.css";
    }
    else
    {
        style.href = "style.css";
    }
}

function switch_css()
{
    is_night_mode = !is_night_mode;
    update_css();
}

var switch_button = document.getElementById("style_switch");
switch_button.addEventListener("click", switch_css);

let date = new Date();
is_night_mode = date.getHours > 19 || date.getHours < 7;

update_css();