 var isCreatingFile = true;//when true writing midi file
    var tracks = [];//used for midi file writing
    var ticksPerSec = 256;//used for midi file writing
    var mwStr;//string for saving midi file data.


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
