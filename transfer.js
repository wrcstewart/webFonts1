function initC(idStr, colStr, l, w, t, h) {

  $("#" + idStr).css({

    "background-color": colStr,
    "position": "absolute",
    "left": l + "%",
    "width": w + "%",
    "top": t + "%",
    "height": h + "%"
  })
};
/*
function crBut(str) {

  var $buts = [];

  $buts[0] = $('<button/>', {text: 'aaaaa'});


  $buts[0].css({"background-color": "Blue"})
  $buts[0].click(function () {
    alert('test')
  });

  $("#" + "editButtonsPanel").append($buts[0]);


//initC('but1','Red',50,100,2,50);

}
*/


function buttonRow(panelIdStr, nButs, textArray, left, width, top, height, colStr) {
   var $buts = [];
  // textArray should be of length nButs and contain the labels for the nButs buttons.
  // the strings will also be used within a corresponding click function to select the reqd. action

  let relButWidth = 0.9;
  let relSpacingWidth = 0.1;
  let butWidth = (width * relButWidth) / nButs;
  let butSpace = (width * relSpacingWidth) / nButs;

  for (let i = 0; i < nButs; i++) {
     $buts[i] = $('<button/>',
       {text:noteNames[i],
       })

     $buts[i].click(function () {

       if(!chordEditorActive) alert("please set edit field to pitchBeats in order to use the chord editor");
       if(chordEditorActive) {
        // alert("note namepressed");
         setPitchArrayNoteName(noteNames[i]);

         let valStr = JSON.stringify(curPitchArray);

          taValueEl.value = valStr;


       }




   // alert(textArray[i]);
  });

       $buts[i].css({

       position:'absolute',
       left:(butSpace)/2 + (i* width/nButs) + "px",
       width:butWidth+"px",
       top:top+"px",
       height:height+"px"
     });

     $("#" + panelIdStr).append($buts[i]);
  }
}

function setPitchArrayNoteName(aNoteName){

  let oldNoteNamePlusOctave = curPitchArray[curPosPitchArray][0];
   updateNoteNamePlusOctave(oldNoteNamePlusOctave, aNoteName);
}


