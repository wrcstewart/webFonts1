

// constructor ie generator for a single track
    function MLine(track, sequencing, start, finish, instrument, bpm, rhythmBeats, pitchBeats, noteDuration) {
      this.track = track;
      this.sequencing = sequencing;
      this.start = start;
      this.finish = finish;
      this.bpm = bpm;
      this.instrument = instrument;
      this.noteDuration = noteDuration;
      this.rhythmBeats = rhythmBeats;
      this.pitchBeats = pitchBeats;
    }


    function getTimeIncr(beats, rhythmBeat) { //calculate time incr from text in beats array
      let beatsString = (beats[rhythmBeat]);
      // F and P modulate sound intensity - R means rest - D dot the note value
      if (beatsString.length == 1) return (beatsMap.get(beatsString))
      // a negative value below will be used to signal a rest of the norma value.
      if (beatsString.charAt(1) == 'R') return (-beatsMap.get(beatsString.substr(0, 1)) * dotMult(beatsString))
      if (beatsString.charAt(1) == 'F') return (beatsMap.get(beatsString.substr(0, 1)) * dotMult(beatsString))
      if (beatsString.charAt(1) == 'P') return (beatsMap.get(beatsString.substr(0, 1)) * dotMult(beatsString))
      function dotMult(beatsString) {
        if (beatsString.includes("D")) return (1.5);
        return (1)
      }
    }

    function getVelocity(beats, rhythmBeat) {
      let velocityNormal = 0.8;
      let velocityF = 1.2;
      let velocityP = 0.3;
      let beatsString = (beats[rhythmBeat]);
      if (beatsString.length == 1) return (velocityNormal);
      if (beatsString.charAt(1) == 'F') return (velocityF);
      if (beatsString.charAt(1) == 'P') return (velocityP);
      return (velocityNormal);
    }

    function getPitchIndexFromTime(t, lenPitchArray) {
      // function below takes the nearest index value to the time t modulo the length of the array.

      let epsilon = -0.0000001; //(Math.random() - 0.5) * 0.0000000001;
      // for Q choose either current or next, randomly
      return ((Math.round(t + epsilon)) % lenPitchArray);
    }

    function reBaseArray(inArray) {
      // e.g. ["C4",0,3,7] is rebased to [60,63,67]
      // if the first element is not a string then inArray is immediately returned.
      //if first array element is a string then this is taken to be the base note
      // and it is translated into its midi pitch value. This value is then added to the rest of the array values.
      // The modified array is returned.
      //the first entry ie the the string, is removed and the elements are shifted down.
      //so the rebased array will have its length reduced by one
      if (typeof inArray[0] !== 'string') return (inArray);
      let baseMidiNumber =getMidiNumberFromName(inArray[0]);
      for (let i = 1; i < inArray.length; i++) {
        inArray[i - 1] = inArray[i];
        if (!Array.isArray(inArray[i - 1])) (inArray[i - 1]) += baseMidiNumber;
      }
      inArray.pop();
      return (inArray)
    }


// these functions concern printing out the notes as they are played. *********************************************
    function refreshMonitor(monitor) {
      let ta = document.getElementById("ta4");
      let report = "";
      for (let i = 0; i < monitor.length; i++) report += monitor[i] + "\n";
      ta.innerHTML = report;
    }

    function showIt(s, instrument, track) {
      // if s is a pitch midi number  convert to note else just print it out

      if (typeof (s) === 'number') {
        monitor[track] = "track: " + track + " " + instrument + ": " + '"' + " " + s + " " + notes[s - 21] + '"';
      } else {

        monitor[track] = "track: " + track + " " + instrument + ": " + s;
      }
      refreshMonitor(monitor);
    }
//******************************************************************************************************************


    function playMLine(mL, origin,tracks) {
// a big function to interpret and play the text - at moment also to generate midi file

      let track = mL.track;


      if (tracks[track] == undefined) {

        tracks[track] = new MidiWriter.Track();
        let dummy = 6;
      }


      var instrumentMidiNum = instrumentsNumMap.get(mL.instrument);
      tracks[track].addEvent(new MidiWriter.ProgramChangeEvent({instrument: instrumentMidiNum}));
      var channel = getChannel(instrumentMidiNum);
      let gainTrack = gainNodeArray[track];
      let but = document.getElementById("loadMusicLine");
      let bpm = mL.bpm;
      let instrumentVar = instrumentsMap.get(mL.instrument);

      let sequencing = mL.sequencing;//this contains mode by which inner arrays within main pitch array are played.
      // i.e. as a CHORD( including single note) or as an ARPEGGIO split within the current rhythm beat.

      let rhythmBeats = mL.rhythmBeats;

      let pitchBeatsString = JSON.stringify(mL.pitchBeats);
      let pitchBeats = JSON.parse(pitchBeatsString);// deep copy of mL.pitchBeats

      pitchBeats = reBaseArray(pitchBeats);// any base strings and relative notes made absolute midi numbers
      // MIGHT have been clearer to return a new array from reBaseArray ?

      let pitchBeatsString2 = JSON.stringify(pitchBeats);
      let masterCopyPitchBeats = JSON.parse(pitchBeatsString2);//master copy is after rebase
      // so pitchBeats may be subject to further write alteration but master copy is just read.

      let pulse = mL.pulse;
      let noteDuration = mL.noteDuration;
      let lenRhythmBeats = rhythmBeats.length;
      let lenPitches = pitchBeats.length;
      let rhythmBeat = 0;

      // everything best understood as occuring in the outer loop pitch beat space - think one pitch beat per second
      // final timings given to the sound player queue are adjusted using tMult to achieve different bpm.
      // e.g. if bpm = 120 then tMult =0.5
      // different note values are determined by the rhythmBeats array and processed in an inner loop.

      //if the required note is accessed and is a further nested array then it will be played as either a chord or
      // split into an arpeggio - the arpeggio is used for the melody - the chord mode for harmony.
      // the arpeggio mode is a compromise solution to introduce variety in the faster notes.
      // otherwise the way the system works would be to simply repeat notes for faster notes.
      // in iteslf this monotony problem is caused by the requirement to 'decouple' rhythm and pitch. For ease of interactive
      // composition.

      let pitchBeat = 0;
      let tMult = 60 / bpm;
      let start = mL.start;
      let endBeat = start + ((mL.finish - start) / tMult);

      let curBeat;
      let p, d, v; //actual values for playSound
      let timeIncr;
      let ws = start; // ignore for time being
      var ixx;
      var cloneP = [];//used for the sounding note monitor.


// --------------------------------

      pitchBeat = start;// currently sets to start


      while (pitchBeat < endBeat) { //overall process to stop when past finish time - from which endBeat was computed.
        // if (playState == "off") return;

        while (rhythmBeat < lenRhythmBeats) {

          if (but.getAttribute("data-playing") == "off") return;

          timeIncr = getTimeIncr(rhythmBeats, rhythmBeat);//nb timeIncr will be used to increment pitchBeat
          // so this is where the rhythm array interacts ultimately with the pitch array


          v = getVelocity(rhythmBeats, rhythmBeat);// volume strength of note F or P or not present

          if (timeIncr > 0) {

            // we need to set up note parameters
            ixx = getPitchIndexFromTime(pitchBeat, lenPitches);//necessary because index is wrapped round to give a loop
            //s = pitchBeat;
            curBeat = pitchBeat; // needed because need this valaue after pitchBeat is incremented.

            p = pitchBeats[ixx];

            cloneP.length = 0;//reinitialise array.

            //we want cloneP to be an array in the original before rebased form e.g. ["C4",0,3,7]
            // this is available in the master copy of the original pitch array
            if (Array.isArray(p)) {
              for (let jj = 0; jj < masterCopyPitchBeats[ixx].length; jj++) cloneP[jj] = masterCopyPitchBeats[ixx][jj];
            } else {
              // otherwise just convert the midi number back to a string version of the note
              cloneP.push(notes[p - 21]);
            }

            d = noteDuration * timeIncr; // an easy one!


            //main place where pitch-time incremented
            pitchBeat += timeIncr;//after note parameters set ---add a separate play chord routine that adjusts time Incr.
            if (pitchBeat > endBeat) break;

            playIfArray(p); //this important function defined after the outer while loop.

            if (!Array.isArray(p)) {


              let t = origin + start + ((curBeat - start) * tMult);//tMult is to map time to true time
              // the timeOutsArray sections are to display text of  note being played. This is complicated by the fact
              // that the player function just queues all the notes for performance at a later time.
              timeOutsArray.push(setTimeout(showIt, (t - origin) * 1000,
                JSON.stringify(cloneP), mL.instrument + " " + sequencing, mL.track));
              player.queueWaveTable(
                audioContext, gainTrack, instrumentVar, t, p, d * tMult, v);
              let writePitch = mapPitchForPercusssion(p, instrumentMidiNum, mL.instrument);
              addNote(tracks[track], t - origin, writePitch, d * tMult, v * 100, channel);


            }

          } //end of if timeIncr >0

          //--------------------------
          // if (playState == "off") return;
          if (but.getAttribute("data-playing") == "off") return;


          if (timeIncr <= 0) {
            pitchBeat += Math.abs(timeIncr);
          }
          rhythmBeat += 1;
          if (rhythmBeat == lenRhythmBeats) rhythmBeat = 0;
        }//end rhythm beats loop
      }//end pitch beat loop and main function ( but see helper function below )
      //---------------------------
      function playIfArray(pitchesEntry) {
        // the calling function should contain the variables curBeat, start, tMult, origin, mL, some player variables

        let pitchEntryNew = reBaseArray(pitchesEntry)
        let velocityReCompensationMult = 1.0;
        if (!Array.isArray(pitchEntryNew)) return;
        let lenPitchesEntry = pitchEntryNew.length;

        let vInner = v * velocityReCompensationMult;
        // alternative idea ...
        // let vInner = v / lenPitchesEntry;
        //let timeInnerIncr = timeIncr/lenPitchesEntry;
        //let innerD = d/lenPitchesEntry;


        if (sequencing == "CHORD") {
          for (let j = 0; j < lenPitchesEntry; j++) {

            if (but.getAttribute("data-playing") == "off") return;//reset button pressed - so finishing

            let t = origin + start + ((curBeat - start) * tMult);

            let chordNotes = extractNotesFromArrayOfMidiNumbers(pitchEntryNew);


            timeOutsArray.push(setTimeout(showIt, (t - origin) * 1000, "  " + JSON.stringify(chordNotes)
              + " " + JSON.stringify(cloneP), mL.instrument + " " + sequencing, mL.track));

            player.queueWaveTable(
              audioContext, gainTrack, instrumentVar, t, pitchEntryNew[j], d * tMult, vInner);
            let writePitch = mapPitchForPercusssion(pitchEntryNew[j], instrumentMidiNum, mL.instrument);
            addNote(tracks[track], t - origin, writePitch, d * tMult, vInner * 100, channel);
          }
        }


        if (sequencing == "ARPEGGIO") {
          // if (playState == "off") return;
          let innerTime = 0;
          let timeInnerIncr = timeIncr / lenPitchesEntry;
          let innerD = (d * tMult) / lenPitchesEntry;
          for (let j = 0; j < lenPitchesEntry; j++) {

            if (but.getAttribute("data-playing") == "off") return;
            let t = origin + start + ((curBeat - start) + innerTime) * tMult;
            let chordNotes = extractNotesFromArrayOfMidiNumbers(pitchEntryNew);
            timeOutsArray.push(setTimeout(showIt, (t - origin) * 1000,
              notes[pitchesEntry[j] - 21] + "  " + JSON.stringify(chordNotes) + "  " + JSON.stringify(cloneP)

              , mL.instrument +
              " " + sequencing, mL.track));
            //gainTrack.gain.value =1.0;
            player.queueWaveTable(
              audioContext,
              gainTrack, instrumentVar, t, pitchEntryNew[j],
              innerD, vInner);
            let writePitch = mapPitchForPercusssion(pitchEntryNew[j], instrumentMidiNum, mL.instrument);
            addNote(tracks[track], t - origin, writePitch, innerD, vInner * 100, channel);


            innerTime += timeInnerIncr;
          }
        }
      } // end playIfArray ---------
    }//end playMLine
    //----------------------------------------------------------------------------
