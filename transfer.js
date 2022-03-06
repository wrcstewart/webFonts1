
function initC(idStr,colStr,l,w,t,h) {

            $("#"+idStr).css({

                    "background-color":colStr,
                    "position":"absolute",
                    "left":l+"%",
                    "width":w+"%",
                    "top":t+"%",
                    "height":h+"%"
            })
};

function crBut(str){

  var $buts = [];

  $buts[0] = $('<button/>',{text:'aaaaa'});

$("#"+"editButtonsPanel").append($buts[0]);

$buts[0].css({ "background-color":"Blue"})

//initC('but1','Red',50,100,2,50);

}
