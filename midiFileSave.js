 var isCreatingFile = true;//when true writing midi file
    //var tracks = [];//used for midi file writing
    //var ticksPerSec = 256;//used for midi file writing


// init tracks at a diff point


function addNote(track, time, pitch, duration, vel, channel) { // used for midi file writing
      var durationString = "T" + Math.round(duration * ticksPerSec)
      var note = new MidiWriter.NoteEvent(
        {
          pitch: pitch,
          duration: durationString,
          startTick: Math.round(time * ticksPerSec),
          velocity: vel,
          channel: channel
        });
      track.addEvent(note);
      return (track)
    }

     // used by midi file writer to arrange output on midi percussion channel or, normal channel
    // var percussionMidiNum = -1; //arbitrary number to signal a percussion instrument
    var percussionChannel = 10; // this channel is how you play midi drums
    var defaultChannel = 1;

     function getChannel(instrumentMidiNum) {
      // if instrumentMidiNum is the negative signal percussionMidiNum then select percussion channel
      if (instrumentMidiNum == percussionMidiNum) return (percussionChannel);
      return (defaultChannel)
    }

      function saveMidiFile() {

      let filename = "MettatreeMusic.mid";
      var write = new MidiWriter.Writer(tracksA);

      let mwStr = write.dataUri();
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        //var url = URL.createObjectURL(blob);
        //var url = URL.createObjectURL(mwStr);
        var url = mwStr;
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      //saveJSON("testMidiP9.mid", mwStr)
    }
