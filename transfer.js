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


function buttonNoteNameRow(panelIdStr, nButs, textArray, left, width, top, height, colStr) {
  var $buts = [];
  // textArray should be of length nButs and contain the labels for the nButs buttons.
  // the strings will also be used within a corresponding click function to select the reqd. action

  let relButWidth = 0.9;
  let relSpacingWidth = 0.1;
  let butWidth = (width * relButWidth) / nButs;
  let butSpace = (width * relSpacingWidth) / nButs;

  for (let i = 0; i < nButs; i++) {
    $buts[i] = $('<button/>',
      {
        text: textArray[i],
      })

    $buts[i].click(function () {



      if (!chordEditorActive) alert("please set edit field to pitchBeats in order to use the chord editor");
      if (chordEditorActive) {

         let but = document.getElementById("loadMusicLine");
       let playState = but.getAttribute("data-playing");
       but.setAttribute("data-playing", "on");
        // alert("note namepressed");
        setPitchArrayNoteName(textArray[i]);

        let valStr = JSON.stringify(curPitchArray);

        taValueEl.value = valStr;
         origin = audioContext.currentTime;

       // let oldFirstIx = firstIx;
        //firstIx = lastIx;
         barsToPlay(document.getElementById("barsToPlayId").value);// set firstIx and lastIx
        if (autoPlay) playPartComposition(sectionsArray, origin, firstIx, lastIx);
        //firstIx = oldFirstIx;
        but.setAttribute("data-playing",playState);


      }


      // alert(textArray[i]);
    });

    $buts[i].css({

      position: 'absolute',
      left: (butSpace) / 2 + (i * width / nButs) + "px",
      width: butWidth + "px",
      top: top + "px",
      height: height + "px"
    });

    $("#" + panelIdStr).append($buts[i]);
  }
}

function setPitchArrayNoteName(aNoteName) {

  let oldNoteNamePlusOctave = curPitchArray[curPosPitchArray][0];
  curPitchArray[curPosPitchArray] = [];
  updateNoteNamePlusOctave(oldNoteNamePlusOctave, aNoteName);
  curPitchArray[curPosPitchArray][1] = 0;
}


function setPitchArrayOctave(octave) {
  let oldNoteNamePlusOctave = curPitchArray[curPosPitchArray][0];
  updateOctave(oldNoteNamePlusOctave, octave);

}

function buttonNoteOctaveRow(panelIdStr, nButs, textArray, left, width, top, height, colStr) {
  var $buts = [];
  // textArray should be of length nButs and contain the labels for the nButs buttons.
  // the strings will also be used within a corresponding click function to select the reqd. action

  let relButWidth = 0.9;
  let relSpacingWidth = 0.1;
  let butWidth = (width * relButWidth) / nButs;
  let butSpace = (width * relSpacingWidth) / nButs;
  for (let i = 0; i < nButs; i++) {
    $buts[i] = $('<button/>',
      {
        text: textArray[i],
      })
    $buts[i].click(function () {





      if (!chordEditorActive) alert("please set edit field to pitchBeats in order to use the chord editor");
      if (chordEditorActive) {

         let but = document.getElementById("loadMusicLine");
       let playState = but.getAttribute("data-playing");
       but.setAttribute("data-playing", "on");
        // alert("note namepressed");
        setPitchArrayOctave(textArray[i]);

        let valStr = JSON.stringify(curPitchArray);

        taValueEl.value = valStr;

        origin = audioContext.currentTime;

        //let oldFirstIx = firstIx;
       //firstIx = lastIx;
        barsToPlay(document.getElementById("barsToPlayId").value);
         if (autoPlay) playPartComposition(sectionsArray, origin, firstIx, lastIx);
        //firstIx = oldFirstIx;
         but.setAttribute("data-playing",playState);
      }
      // alert(textArray[i]);

    });

    $buts[i].css({

      position: 'absolute',
      left: (butSpace) / 2 + (i * width / nButs) + "px",
      width: butWidth + "px",
      top: top + "px",
      height: height + "px"
    });

    $("#" + panelIdStr).append($buts[i]);
  }

}

//---------------------------------------------------------------------------

function buttonChordsRow(panelIdStr, nButs, textArray, left, width, top, height, colStr) {
  var $buts = [];
  // textArray should be of length nButs and contain the labels for the nButs buttons.
  // the strings will also be used within a corresponding click function to select the reqd. action

  let relButWidth = 1.0;
  let relSpacingWidth = 0;
  let butWidth = (width * relButWidth) / nButs;
  let butSpace = (width * relSpacingWidth) / nButs;
  for (let i = 0; i < nButs; i++) {
    $buts[i] = $('<button/>',
      {
        text: textArray[i],
        textAlign: left,

      })
    $buts[i].click(function () {


      if (!chordEditorActive) alert("please set edit field to pitchBeats in order to use the chord editor");
      if (chordEditorActive) {
        // alert("note namepressed");
let but = document.getElementById("loadMusicLine");
       let playState = but.getAttribute("data-playing");
       but.setAttribute("data-playing", "on");
        let updateArray = chords.get(textArray[i]);
        curPitchArray[curPosPitchArray] = updateArrayAfterIx0(curPitchArray[curPosPitchArray], updateArray);

        document.getElementById("taArrayValueId").value =
          JSON.stringify(curPitchArray[curPosPitchArray]);

        let valStr = JSON.stringify(curPitchArray);

        taValueEl.value = valStr;
         origin = audioContext.currentTime;

        //let oldFirstIx = firstIx;
       // firstIx = lastIx;
         barsToPlay(document.getElementById("barsToPlayId").value);
         if (autoPlay) playPartComposition(sectionsArray, origin, firstIx, lastIx);
      //  firstIx = oldFirstIx;
but.setAttribute("data-playing",playState);

      }
      // alert(textArray[i]);
    });

    $buts[i].css({
      margin: 0,
      padding: 0,
      fontSize: 10,
      textAlign: 'left',
      position: 'absolute',
      left: (butSpace) / 2 + (i * width / nButs) + "px",
      width: butWidth + "px",
      top: top + "px",

      height: height + "px"
    });

    $("#" + panelIdStr).append($buts[i]);


  }
}

function updateArrayAfterIx0(oldArray, newEndOfArray) {
  // first ensure entries after ix 0 are clear.

  let firstEntry = oldArray[0];
  oldArray = [];
  oldArray[0] = firstEntry;

  // now good old for loop
  for (let i = 0; i < newEndOfArray.length; i++) {
    oldArray[i + 1] = newEndOfArray[i];
  }
  return (oldArray);
}



