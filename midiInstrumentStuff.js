var percussionMidiNum = -1; //arbitrary number to signal a percussion instrument

const instrumentsMap = new Map();
    {
      instrumentsMap.set("Blown bottle Pipe 1", _tone_0760_Aspirin_sf2_file)
      instrumentsMap.set("Flute Pipe 1", _tone_0730_Aspirin_sf2_file)
      instrumentsMap.set("Acoustic Grand Piano", _tone_0000_JCLive_sf2_file)
      instrumentsMap.set("Bass Drum 2", _drum_35_0_Chaos_sf2_file);
      instrumentsMap.set("Acoustic Bass Drum", _drum_35_0_Chaos_sf2_file);
      instrumentsMap.set("Snare Drum 1", _drum_38_0_Chaos_sf2_file);
      instrumentsMap.set("Hi-hat 1", _drum_42_0_Chaos_sf2_file);
    }

    const instrumentsNumMap = new Map(); //gives the midi patch num or an arb neg num for percussion
    {
      instrumentsNumMap.set("Blown bottle Pipe 1", 77)
      instrumentsNumMap.set("Flute Pipe 1", 74)
      instrumentsNumMap.set("Acoustic Grand Piano", 1)
      instrumentsNumMap.set("Acoustic Bass Drum", percussionMidiNum);
      instrumentsNumMap.set("Bass Drum 2", percussionMidiNum);
      instrumentsNumMap.set("Acoustic Snare", percussionMidiNum);
      instrumentsNumMap.set("Closed Hi Hat", percussionMidiNum);
      instrumentsNumMap.set("Hi-hat 1", percussionMidiNum);
    }

     function mapPitchForPercusssion(pitch, instrumentNum, instrument) {

      if (instrumentNum !== percussionMidiNum) {
        return (pitch)
      } else {
        if (instrument == "Acoustic Bass Drum") return (35);
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

     var noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];//used to construct notes[] below
    var notes = []; // this allows easy look up of note name to midi number - but based with A0 = 0
    // a function will add 21 to give the correct official midi number of the notes.
    // the true note names are only used once per generative run - to allow user to enter start note.
    var notesIx = 3;//index 3 will correspond to the first C

    // next loop adds the octave number to the noteName across th octaves outs result in notes[]
    // see the array definitions/ inits for clarification.
    for (let octave = 1; octave <= 7; octave++) {
      for (let noteNamesIx = 0; noteNamesIx <= 11; noteNamesIx++) {
        notes[notesIx] = noteNames[noteNamesIx] + octave;
        notesIx++;
      }
    }
    //now fill in the few notes not covered by the loop above

    {
      notes[0] = "A0";
      notes[1] = "A#0";
      notes[2] = "B0";
      notes[87] = "C8";
    }

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

