var audioContext = new (window.AudioContext || window.webkitAudioContext)();


    var player = new WebAudioFontPlayer();
    var gainNodeArray = []
    var maxTracks = 10;
   var tracks =[];
   var tracksA =[];
    var ticksPerSec = 256;
    var mLineArrayEdit =[];
    var chordEditorActive = false;
    var curPitchArray;
    var curPosPitchArray;
    var curInnerPitchArray;
    var curNumberOfBarsToPlay;
    var audioFileLink;
    var musicKey = 'mettaTreeMusicStorage';
    var autoPlay = 'true';



    // --- show what is being suggested in read only mode in separate text area
function doFormat(obj, aTextAreaEl) {

  let arrayOfKeys = Object.keys(obj);
  // aTextAreaEl.value = "";
  for (let i = 0; i < arrayOfKeys.length; i++) {
    let aKey = arrayOfKeys[i];
    let aEntryStr = JSON.stringify(obj, [aKey]);

    aTextAreaEl.value = aTextAreaEl.value + aEntryStr + "\n";
  }
}


function doFormatArray(mLineArrayParam, aTextAreaEl) {
        aTextAreaEl.value = "";
        for (let j = 0; j < mLineArrayParam.length; j++) {
          doFormat(mLineArrayParam[j], aTextAreaEl);
          aTextAreaEl.value = aTextAreaEl.value + "\n";
        }
      }




