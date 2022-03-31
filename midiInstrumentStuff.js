var percussionMidiNum = -1; //arbitrary number to signal a percussion instrument

const instrumentsMap = new Map();
    {
      instrumentsMap.set("Blown bottle Pipe 1", _tone_0760_Aspirin_sf2_file)
      instrumentsMap.set("Flute", _tone_0730_Aspirin_sf2_file)
      instrumentsMap.set("Piano", _tone_0000_JCLive_sf2_file)
      instrumentsMap.set("Bass Drum", _drum_35_0_Chaos_sf2_file);
      instrumentsMap.set("Acoustic Bass Drum", _drum_35_0_Chaos_sf2_file);
      instrumentsMap.set("Snare Drum 1", _drum_38_0_Chaos_sf2_file);
      instrumentsMap.set("Hi-hat 1", _drum_42_0_Chaos_sf2_file);
    }

    const instrumentsNumMap = new Map(); //gives the midi patch num or an arb neg num for percussion
    {
      instrumentsNumMap.set("Blown bottle Pipe 1", 77)
      instrumentsNumMap.set("Flute", 74)
      instrumentsNumMap.set("Piano", 1)
      instrumentsNumMap.set("Acoustic Bass Drum", percussionMidiNum);
      instrumentsNumMap.set("Bass Drum", percussionMidiNum);
      instrumentsNumMap.set("Acoustic Snare", percussionMidiNum);
      instrumentsNumMap.set("Closed Hi Hat", percussionMidiNum);
      instrumentsNumMap.set("Hi-hat 1", percussionMidiNum);
    }
    instrumentArray[0] = "Piano";
    instrumentArray[1] = "Bass Drum";
    instrumentArray[2] = "Flute";



    /*
    CHECK THE UNCOMMENTED SECTION BELOW IN loadJSONandStartPlay.js
    is consistent with the Maps above. I don't know why I can't put the following statements here.

    //player.loader.decodeAfterLoading(audioContext,'_tone_0000_JCLive_sf2_file' );
      player.loader.decodeAfterLoading(audioContext, '_tone_0730_Aspirin_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_47_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_tone_0760_Aspirin_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_35_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_38_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_42_0_Chaos_sf2_file');
    }

     */

 {
  // the assignment to a variable below seems to allow the block to be placed here - otherwise
   // I had to have the statements later on in the scripts. I prefer here so the
   //instrument stuff is together.

   // this one not in use at moment.
      //player.loader.decodeAfterLoading(audioContext,'_tone_0000_JCLive_sf2_file' );

      var decodeAfterLoading = player.loader.decodeAfterLoading(audioContext, '_tone_0730_Aspirin_sf2_file');
   decodeAfterLoading =   player.loader.decodeAfterLoading(audioContext, '_drum_47_0_Chaos_sf2_file');
     decodeAfterLoading = player.loader.decodeAfterLoading(audioContext, '_tone_0760_Aspirin_sf2_file');
      decodeAfterLoading =player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
      decodeAfterLoading =player.loader.decodeAfterLoading(audioContext, '_drum_35_0_Chaos_sf2_file');
      decodeAfterLoading =player.loader.decodeAfterLoading(audioContext, '_drum_38_0_Chaos_sf2_file');
      decodeAfterLoading = player.loader.decodeAfterLoading(audioContext, '_drum_42_0_Chaos_sf2_file');
    }//loading player DON'T FORGET TO DO THIS !





     function mapPitchForPercusssion(pitch, instrumentNum, instrument) {

      if (instrumentNum !== percussionMidiNum) {
        return (pitch)
      } else {
        if (instrument == "Bass Drum") return (35);
        if (instrument == "Bass Drum 2") return (35);

        if (instrument == "Acoustic Snare") return (38);
        if (instrument == "Closed Hi Hat") return (42);
        if (instrument == "Hi-hat 1") return (42);

        return (45); //Low Tom
      }
    }

    // below a text code to select note length
    // - might replace this- just use the numbers directly.
    const beatsMap = new Map();
    {
      beatsMap.set('C', 1.0);
      beatsMap.set('Q', 0.5);
      beatsMap.set('M', 2.0);
      beatsMap.set('B', 8.0);
      beatsMap.set('H', 4.0);
      beatsMap.set('CR', 1.0);
      beatsMap.set('QR', 0.5);
      beatsMap.set('MR', 2.0);
      beatsMap.set('S', 0.25);
      beatsMap.set('SR', 0.25);
    }

    // var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];//used to construct notes[] below
     var noteNames =  ["A", "A#", "B","C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    var noteNamesA = ["A", "A#", "B","C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    var noteOctaves = ["0","1","2","3","4","5","6","7"];
    var dyadNamesPlus = ["1","+m2","+2","+m3","+3","+4","+m5","+5","+m6","+6","+m7","+7","+8","+9","+11","+13","+15"];
    var dyadNamesMinus = ["1","-m2","-2","-m3","-3","-4","-m5","-5","-m6","-6","-m7","-7","-8","-9","-11","-13","-15"];
var triadNames = ["prim","sus2","m","M","sus4","dim","aug","oct"];
var tetradNames = ["m&6","M&6","m&m7","M&m7","m&7","M&7","mOct","MOct"];


    const chords = new Map();

    chords.set("prim",[0,0,0]);
    chords.set("sus2",[0,2,7]);
    chords.set("m",[0,3,7]);
    chords.set("M",[0,4,7]);
    chords.set("sus4",[0,5,7]);
    chords.set("dim",[0,3,6]);
    chords.set("aug",[0,4,8]);
    chords.set("oct",[0,8,8]);

    chords.set("m&6",[0,3,7,9]);
    chords.set("M&6",[0,4,7,9]);
    chords.set("m&m7",[0,3,7,10]);
    chords.set("M&m7",[0,4,7,10]);
    chords.set("m&7",[0,3,7,11]);
    chords.set("M&7",[0,4,7,11]);
    chords.set("mOct",[0,3,7,12]);
    chords.set("MOct",[0,4,7,12]);



chords.set("1",[0,0]);
    chords.set("+m2",[0,1]);
    chords.set("+2",[0,2]);
    chords.set("+m3",[0,3]);
    chords.set("+3",[0,4]);
    chords.set("+4",[0,5]);
    chords.set("+m5",[0,6]);
    chords.set("+5",[0,7]);
    chords.set("+m6",[0,8]);
    chords.set("+6",[0,9]);
    chords.set("+m7",[0,10]);
    chords.set("+7",[0,11]);
    chords.set("+8",[0,12]);
    chords.set("+9",[0,14]);
    chords.set("+11",[0,17]);
    chords.set("+13",[0,21]);
    chords.set("+15",[0,23]);
    chords.set("-m2",[0,-1]);
    chords.set("-2",[0,-2]);
    chords.set("-m3",[0,-3]);
    chords.set("-3",[0,-4]);
    chords.set("-4",[0,-5]);
    chords.set("-m5",[0,-6]);
    chords.set("-5",[0,-7]);
    chords.set("-m6",[0,-8]);
    chords.set("-6",[0,-9]);
    chords.set("-m7",[0,-10]);
    chords.set("-7",[0,-11]);
    chords.set("-8",[0,-12]);
    chords.set("-9",[0,-14]);
    chords.set("-11",[0,-17]);
    chords.set("-13",[0,-21]);
    chords.set("15",[0,-23]);






    var notes = []; // this allows easy look up of note name to midi number - but based with A0 = 0
    // a function will add 21 to give the correct official midi number of the notes.
    // the true note names are only used once per generative run - to allow user to enter start note.
    //var notesIx = 3;//index 3 will correspond to the first C
    var notesIx = 0;//index 3 will correspond to the first C

    // next loop adds the octave number to the noteName across th octaves outs result in notes[]
    // see the array definitions/ inits for clarification.
    for (let octave = 0; octave <= 7; octave++) {
      for (let noteNamesIx = 0; noteNamesIx <= 11; noteNamesIx++) {
        notes[notesIx] = noteNames[noteNamesIx] + octave;
        notesIx++;
      }
    }
    //now fill in the few notes not covered by the loop above
/*
    {
      notes[0] = "A0";
      notes[1] = "A#0";
      notes[2] = "B0";
      notes[87] = "C8";
    }
    */





     function getMidiNumberFromName(noteName) {
      return (notes.indexOf(noteName) + 21)
    }

     function extractNotesFromArrayOfMidiNumbers(pitchesEntry) {//sends array of midi pitch mumbers back to note form
      let result = [];
      for (let j = 0; j < pitchesEntry.length; j++) {
        result[j] = notes[pitchesEntry[j] - 21]
      }
      return (result);
    }

    //Below principally for experimentation with generative algs
 var probs = [0.2, 0.4, 0.15, 0.15, 0.025, 0.025, 0.025, 0.025];
    //prob of jumping up or down by the index 0 to 7 corresponding to scale notes;
    //var cumulativeProbs = [0.0, 0.2, 0.5, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0];

    function generateCumulativeArray(arr) {
      let cumArr = [];
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {
        cumArr[i] = sum;
        sum = sum + arr[i]
      }
      cumArr[arr.length] = sum;
      return (cumArr)
    }

    var cumulativeProbs = generateCumulativeArray(probs);

    function stepScale8() { //compute a random step size in a scale of 8 notes
      let i;
      let cumP = Math.random();
      for (i = 0; i <= 7; i++) if (cumulativeProbs[i + 1] >= cumP) break;
      return (i);
    }

    function newNoteScale8(oldNoteScale8) {
      let step = stepScale8();
      // the next function determines whether the step should be positive, negative or 0
      let limit = 8; //max scale notes excursion
      if ((oldNoteScale8 + step) > limit) return (oldNoteScale8 - step);
      if ((oldNoteScale8 - step) < -limit) return (oldNoteScale8 + step);

      if (Math.random() <= 0.5) return (oldNoteScale8 - step);
      return (oldNoteScale8 + step);
    }

    var RelativeMidiNumOfHMScalePositive = [0, 2, 3, 5, 7, 8, 11, 12, 14, 15, 17];
    var RelativeMidiNumOfHMScaleNegative = [0, -1, -4, -5, -7, -9, -10, -12, -13, -16, -17];

    function getMidiNumberHarmonicMinorScale(scaleNote, midiBaseNumber) {
      if (scaleNote >= 0) return (midiBaseNumber + RelativeMidiNumOfHMScalePositive[scaleNote]);
      if (scaleNote < 0) return (midiBaseNumber + RelativeMidiNumOfHMScaleNegative[-scaleNote]);
    }

    // end ? of experimental section

