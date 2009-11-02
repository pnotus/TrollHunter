// ==UserScript==
// @name                Troll Hunter
// @description	        hunt down tolls on idg.se
// @include				http://idg.se/*
// @include				http://*.idg.se/*
// @include				http://localhost/TrollHunter/*
// @require				http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var trollId = "trolls";

var user_delete_icon = 
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdB" + 
	"TUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMKSURBVH" + 
	"jaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPh" + 
	"cn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3ecvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff" + 
	"7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG51QyOgUkMz7+yMLz9wcLwjUWAgYuD" + 
	"iXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDXcmHY2Rn2XVtDFsXPAAGEYc" + 
	"D3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjFCxI+y1gnP3S4t3Nx" + 
	"HwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PEtB2zLBiuzo" + 
	"xi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBiOMfA" + 
	"yXDuA9A7X4HR+J2B4Q9QqeOtaQyKZ6cw/Hp6h+ErM9t7NoZfPZ67frUBBBA4DCS4vvpLMr6Zn1" + 
	"4SzHDoLTPD1W//GX4Do+8P0LcgWvfidAa9TysYNCNSGNgVtRm+X9olePXw7ubdLqyfAQII7ILz" + 
	"tZp/ZMwDmFe9tmY4I+nDwAx0+b8//8EG/PnJwBC0Wo3BOzWTgfPuAQaGp0cYGPgFGN6wyDOc23" + 
	"X4PkAAgV3AzMjIxMLOxXDkxBsGndBvDNc/cjH8/8PA8PcXxBWCnx4ycEgoMjB4FSGir0GSgfkf" + 
	"owJAAIFjgUnVpfr+/sV/OH8//7Nx6SkGNt7/DByCDAzc4kDLZBkYPgtIMXy7sJWBAajpZzkjw3" + 
	"sg/vTyNcNf5v/PAAIIHgsPVmbxzr8kzbbomn7r/w9vvZlZuYQYGJlYGf79Zwji2MIYJH6CRUHk" + 
	"FwML0xOGz6//MDx4yfz394//dQABxEhsdj4aIVfx9d2zdOa/jPJAm58CdU133/WnDSDAAKjSJt" + 
	"OMc/NjAAAAAElFTkSuQmCC";

var user_add_icon = 
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdB" + 
	"TUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMASURBVH" + 
	"jaYvz//z8DJQAggFiwCWabidYqC/8rZ2b+x/3r73+Gz7+Yvt37yNK/5MyrGnS1AAHEiO6CDBPh" + 
	"cn3p/+2sXIyM/4D8X7//M3z5/o/h1Zf//299YG3ecvFNPbJ6gABiQjfRQOJvBydQ8/tPfxneff" + 
	"7L8OUHA8M/JjYGFmYWRkHWPwXo6gECCMOAD0BNkvZZDFG51QyOgUkMz7+yMLz9wcLwjUWAgYuD" + 
	"iXNxpR87snqAAMIIAxEF4Xf2gbFCv+7uY5BlYWFIzsxi4OPhYuDXcmHY2Rn2XVtDFsXPAAGEYc" + 
	"D3v9zXvz86a/2HXYRBkPsPg6CoFMOXP8wMDO9uAQOT67Zu/NRfyOoBAgjFCxI+y1gnP3S4t3Nx" + 
	"HwMfw0cGRhYOIGZn4GH+xXBgeS/D5DvWD8Xc5nAi6wEIIHgsiHmvYP/3728SJ4PEtB2zLBiuzo" + 
	"xi+M8AkWMEQqnopQyRBacZvv25X8DI8Hv2m73p30ByAAEENkDEaxXjr78M8UJs0vO3zzBiOMfA" + 
	"yXDuA9A7X4HR+J2B4Q9QqeTX9Qy/3mwCRul7ho9fP//4+OVd+/aO800AAQQOAwmur/6SjG/mp5" + 
	"cEMxx6y8xw9dt/ht/A6PsD9C2IZn61koFTYBeDja0pg4yQKsP+qxs4Tlw53GiRI8UHEEDgMFis" + 
	"2bVmWfw7hpfXtjOceMbA8O09I8PPzwxg/PsL0KC3ixkMNPQZ/jL9ZdCXdGX4y/ibwULXCpxoAQ" + 
	"IIbAAzIyMTCzsXw5ETbxhUWL4x/AA6+ScQ//oG8cL7z88ZWBl5GPw0c8FhUuw8i0FZTA/E5AAI" + 
	"ILABTKou1ff3L/7D+fv5n41LTzGw8f5n4BBkYOAWZ2DglwXG4OePDFefHWPo2J0INqBjVyLD3V" + 
	"eXQMwfAAEEj4UHK7N451+SZlt0Tb/1/4e33sysXEIMjEysDP/+M3ALb2RUMz3DYqVnw6AqYchw" + 
	"+8V5hmOXjjA8uf+xFyCAGInNzsAA6wBSWUDMC8TA0GGYdmLKswqAAAMAnFQdkhuzRSAAAAAASU" + 
	"VORK5CYII%3D";

slayTrolls();

$("div.divCommentsFooter p.right").append("<span class='commentTrollButton'><img src=" + user_delete_icon + " width='16' height='16' alt='Slay troll' class='slayToll' /></span>");

$("span.commentAuthor").click(function(){
    tagAsTroll($(this).text());
    slayTrolls();
})

// TODO: Borde använda "live" isf "click"?
$("img.slayToll").click(function(){
	tagAsTroll($(this).parents("div.divCommentsFooter").find("span.commentAuthor").text());
	slayTrolls();
})

function slayTrolls(){
    $("form").each(function(){
		var name = getNameFromForm($(this));
		
        if (commenterIsTroll(name)) {
			$(this).find("div.divCommentsContentHeaderTop p.left").text("(Trollet \'" + name + "\' är infångat av Troll Hunter)");
 			$(this).find("div.divCommentsContentHeaderTop p.right span").append("<img src=" + user_add_icon + " width='16' height='16' alt='Resurrect troll' class='resurrectTroll' />");
			$(this).find("div.divCommentsContentHeader p.left").text("(Trollet \'" + name + "\' är infångat av Troll Hunter)");
			$(this).find("div.divCommentsContentHeader p.right span").append("<img src=" + user_add_icon + " width='16' height='16' alt='Resurrect troll' class='resurrectTroll' />");
            $(this).find("div.divCommentsContent").slideUp();
			$(this).find("div.divCommentsFooter").slideUp();
        }
    });
}

function findTrolls(){
    return GM_getValue(trollId, "").split(";");
}

function tagAsTroll(name){
    GM_setValue(trollId, GM_getValue(trollId, "") + name + ";");
}

function commenterIsTroll(name){
    return ($.inArray(name, findTrolls()) > -1);
}

function getNameFromForm(form)
{
	var name = form.find("span.commentAuthor").text();

	if (name.length > 0) {
		return name;
	}
	else {
		return "CommenterNameIsMissing";
	}
}

/* A global variable - getImgInPositionedDivHtml - is declared and
   assigned the value of an inner function expression returned from
   a one-time call to an outer function expression.

   That inner function returns a string of HTML that represents an
   absolutely positioned DIV wrapped round an IMG element, such that
   all of the variable attribute values are provided as parameters
   to the function call:-
*/
var getImgInPositionedDivHtml = (function(){
    /* The - buffAr - Array is assigned to a local variable of the
       outer function expression. It is only created once and that one
       instance of the array is available to the inner function so that
       it can be used on each execution of that inner function.

       Empty strings are used as placeholders for the date that is to
       be inserted into the Array by the inner function:-
    */
    var buffAr = [
        '<div id="',
        '',   //index 1, DIV ID attribute
        '" style="position:absolute;top:',
        '',   //index 3, DIV top position
        'px;left:',
        '',   //index 5, DIV left position
        'px;width:',
        '',   //index 7, DIV width
        'px;height:',
        '',   //index 9, DIV height
        'px;overflow:hidden;\"><img src=\"',
        '',   //index 11, IMG URL
        '\" width=\"',
        '',   //index 13, IMG width
        '\" height=\"',
        '',   //index 15, IMG height
        '\" alt=\"',
        '',   //index 17, IMG alt text
        '\"><\/div>'
    ];
    /* Return the inner function object that is the result of the
       evaluation of a function expression. It is this inner function
       object that will be executed on each call to -
       getImgInPositionedDivHtml( ... ) -:-
    */
    return (function(url, id, width, height, top, left, altText){
        /* Assign the various parameters to the corresponding
           locations in the buffer array:-
        */
        buffAr[1] = id;
        buffAr[3] = top;
        buffAr[5] = left;
        buffAr[13] = (buffAr[7] = width);
        buffAr[15] = (buffAr[9] = height);
        buffAr[11] = url;
        buffAr[17] = altText;
        /* Return the string created by joining each element in the
           array using an empty string (which is the same as just
           joining the elements together):-
        */
        return buffAr.join('');
    }); //:End of inner function expression.
})();
/*^^- :The inline execution of the outer function expression. */