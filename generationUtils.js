function createNotePitchArray(tonicNoteName, len) {
      let midiBaseNumber = getMidiNumberFromName(tonicNoteName);

      let midiNumberArray = [];
      let oldNoteScale = 0;
      let newNoteScale = 0;
      midiNumberArray[0] = midiBaseNumber;
      let count = 1
      while (count < len) {
        newNoteScale = newNoteScale8(oldNoteScale);
        midiNumberArray[count] = getMidiNumberHarmonicMinorScale(newNoteScale, midiBaseNumber);
        oldNoteScale = newNoteScale;
        count++;
      }
      return (midiNumberArray)
    }

    function createTransposedPitchArray(AMidiNumberArray, semitoneShift) {
      let len = AMidiNumberArray.length;
      let result = [];
      for (let i = 0; i < len; i++) result[i] = AMidiNumberArray[i] + semitoneShift;
      return (result)
    }
