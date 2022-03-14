// INCLUDES AUDIO FILE SAVE AS WELL AS EDITING JSON

// First section is audio file save
var fileDest = audioContext.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(fileDest.stream);
var chunks = [];


mediaRecorder.ondataavailable = function (evt) {
  // push each chunk (blobs) in an array
  chunks.push(evt.data);
  let dummy = 4;
};

mediaRecorder.onstop = function (evt) {
  // Make blob out of our blobs, and open it.
  //let blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
  let blob = new Blob(chunks, {'type': 'audio/webm; codecs=opus'});
  // let blob = new Blob(chunks, {'type': 'audio/mpeg; codecs=audio/mp3'});
  chunks = []; // try and stop cocatenation

  //let audioTag = document.createElement('audio');

  //document.querySelector("audio").src = URL.createObjectURL(blob);


  //var link = document.createElement("a");

  // Browsers that support HTML5 download attribute
  var url = URL.createObjectURL(blob);

  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "audiotestAmpF");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function stoppingRecorder() {
  mediaRecorder.requestData()
  mediaRecorder.stop();
}

// after this it is gain control plus routing to the fileDest for the audio file


// set up gain tracks
for (let i = 0; i < maxTracks; i++) {
  gainNodeArray[i] = audioContext.createGain();
  gainNodeArray[i].connect(audioContext.destination);
  gainNodeArray[i].connect(fileDest);// this line for the creating audio file
}


var gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
var gainWeights = [];
var isFeaturing = false;

function edit(elTrackSpinner, isFeaturing) {
  let normalGain = 0.5;
  let backgroundGain = 0.05;
  let foregroundGain = 0.9;
  let editTrack = elTrackSpinner.value;
  if (isFeaturing) {
    for (let track = 0; track < maxTracks; track++) {
      gainNodeArray[track].gain.value = backgroundGain;
      if (track == editTrack) gainNodeArray[track].gain.value = foregroundGain;
    }
  }
  if (!isFeaturing) {
    for (let track = 0; track < maxTracks; track++) {
      gainNodeArray[track].gain.value = normalGain;
    }
  }
  doEdit(editTrack, mLineArray);
}


function ixOfTrack(mLineArray, targetTrack) {
  for (let ix = 0; ix < mLineArray.length; ix++) {
    if (mLineArray[ix].track == targetTrack) return (ix)
  }
  return (null)
}


function doEdit(editTrack, mLineArray) {
  let ix = ixOfTrack(mLineArray, editTrack);
  curEditTrackIx = ix;
  //let strMusicLine  = JSON.stringify(mLineArray[ix]);//change to link to id
  // alert(""+ editTrack +strMusicLine);
  //document.getElementById('edit').innerText = strMusicLine;
  let aMLine = mLineArray[ix];
  //let aTextAreaEl = document.getElementById('edit');
  //doFormat(aMLine, aTextAreaEl);
  outputField(aMLine, document.getElementById("fieldNumber").value, taNameEl, taValueEl);
  return
}

function doFormat(obj, aTextAreaEl) {

  let arrayOfKeys = Object.keys(obj);
  // aTextAreaEl.value = "";
  for (let i = 0; i < arrayOfKeys.length; i++) {
    let aKey = arrayOfKeys[i];
    let aEntryStr = JSON.stringify(obj, [aKey]);

    aTextAreaEl.value = aTextAreaEl.value + aEntryStr + "\n";
  }
}

function outputField(obj, position, taNameEl, taValueEl) {
  let arr = Object.entries(obj);
  let aField = arr[position];
  let aName = aField[0];
  //let aValue = aField[1];
  taNameEl.value = aName;
  let origVal = obj[aName];

  let valStr = JSON.stringify(origVal)
  taValueEl.value = valStr;

  if (aName == "pitchBeats") {
    chordEditorActive = true;
    document.getElementById("taArrayValueId").value = JSON.stringify(origVal[0]);
    curInnerPitchArray = origVal[0];
    curPitchArray = origVal;
    curPosPitchArray = document.getElementById("arrayPositionId").value;

  } else {
    document.getElementById("taArrayValueId").value = "";
    chordEditorActive = false;
  }
  ;


}

function inputField(taNameEl, taValueEl) {
  let l = sectionsArray.length;
  mLineArrayEdit = sectionsArray[l - 1];
  let obj = mLineArrayEdit[curEditTrackIx];
  let aKeyString = taNameEl.value;
  obj[aKeyString] = JSON.parse(taValueEl.value);
  mLineArrayEdit[curEditTrackIx] = obj; //reinsert into master array of mLine objects.
  doFormatArray(mLineArrayEdit, document.getElementById("ta1"));
}

function selectPosition(pos) {
  curPosPitchArray = pos;
  document.getElementById("taArrayValueId").value =
    JSON.stringify(curPitchArray[pos]);
  curInnerPitchArray = curPitchArray[pos];
}

function updateNoteNamePlusOctave(oldNoteNamePlusOctave, newNoteName) {
  // eg. inputting ("C4" , "D#") should give "D#4" etc
  // old note name will be either 1 or 2 characters before the octave.
  // octave is always single digit
  let octave = oldNoteNamePlusOctave.substr(-1);
  curInnerPitchArray[0] = newNoteName + octave;
  curPitchArray[curPosPitchArray] = curInnerPitchArray;
  document.getElementById("taArrayValueId").value =
    JSON.stringify(curPitchArray[curPosPitchArray]);
  //taValueEl = document.getElementById("taArrayValueId").value;
  //try this !!
  //let curFieldNum = document.getElementById("fieldNumber").value;
 //outputField(mLineArray[curEditTrack], curFieldNum, taNameEl, taValueEl);

}

function updateOctave(oldNoteNamePlusOctave, octave) {
  // eg. inputting ("C4" , "5") should give "C5" etc
  // old note name will be either 1 or 2 characters before the octave.
  // octave is always single digit
  let l = oldNoteNamePlusOctave.length;
  let noteNameStem = oldNoteNamePlusOctave.substring(0, l - 1);
  curInnerPitchArray[0] = noteNameStem + octave;
  curPitchArray[curPosPitchArray] = curInnerPitchArray;
  document.getElementById("taArrayValueId").value =
    JSON.stringify(curPitchArray[curPosPitchArray]);
  //taValueEl = document.getElementById("taArrayValueId").value;
  //try this !!
  //let curFieldNum = document.getElementById("fieldNumber").value;
  //outputField(mLineArray[curEditTrack], curFieldNum, taNameEl, taValueEl);
}

