var audioContext = new (window.AudioContext || window.webkitAudioContext)();


    var player = new WebAudioFontPlayer();
    var gainNodeArray = []
    var maxTracks = 10;
   var tracks =[];
   var tracksA =[];
    var ticksPerSec = 256;
    var mLineArrayEdit =[];

    // --- show what is being suggested in read only mode in separate text area

      function doFormatArray(mLineArrayParam, aTextAreaEl) {
        aTextAreaEl.value = "";
        for (let j = 0; j < mLineArrayParam.length; j++) {
          doFormat(mLineArrayParam[j], aTextAreaEl);
          aTextAreaEl.value = aTextAreaEl.value + "\n";
        }
      }




