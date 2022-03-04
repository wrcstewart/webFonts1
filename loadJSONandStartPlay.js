 var origin;// this is used by soundfont player to find current time zero in the audio context

 function loadJSON() {
      let but = document.getElementById("loadMusicLine");

      let playState = but.getAttribute("data-playing");

      if (playState == "off") {
        but.setAttribute("data-playing", "on");
        but.innerHTML = "Reset";
      } else {
        but.setAttribute("data-playing", "off");
        but.innerHTML = "Play";
        player.cancelQueue(audioContext);
        stoppingRecorder()
        timeOutsArray.forEach((item) => {
          clearTimeout(item)
        });
        timeOutsArray.length = 0;
        return;
      }


      var inString = document.getElementById("ta1").value;


      origin = audioContext.currentTime;

      //playMLine(loadedML,origin);
      mediaRecorder.start();


      // setTimeout(stoppingRecorder,(mLineArray[0]).finish)*1000);
     // playSection(mLineArray, origin);
   playComposition(sectionsArray,origin);

    }//main PLAY it function !!!!!!!

 function playSection(mLineArray, origin) {
      tracks.length = 0;
      var currentTrack;
      let len = mLineArray.length;
      for (let i = 0; i < len; i++) {
        currentTrack = i;//prob don't need this -will see ...
        playMLine(mLineArray[i], origin,tracksA);
      }
    }
/*
   function cocatSection(mLineArray1,mLineArray2) {

      // need to adjust start and finish of second array.
     // both arrays must be non empty of MLine objects.
      let len = mLineArray2.length;
      let st = mLineArray1[0].finish;
      let dur = mLineArray2[0].finish - mLineArray2[0].start;
      for (let i = 0; i < len; i++) {
       mLineArray2[i].start =st;
      mLineArray2[i].finish =  st + dur;
      }
    }

 */





    function playComposition(sectionsArray,origin){
   // takes an array holding several  sections (mLineArray s to play sequentially.

    //  first build an array of the  finish times. the start times are all zero

      // then an array of new start times and new finish times for cocatenation

      // before each section is played the start and finish times will be altered
      // then reset to the old values after playing the section.
      let oldStarts =[] ;
let oldFinishes =[];
let newStarts =[];
let newFinishes = [];
let len = sectionsArray.length;

 for (let i = 0; i < len; i++) {

        oldStarts[i] =0;
       oldFinishes[i] = sectionsArray[i][0].finish;
 }

  newStarts[0] = 0;
 newFinishes[0] = oldFinishes[0];
 for (let i = 1; i < len; i++) {


      newStarts[i] = newFinishes[i-1];
      newFinishes[i] = newStarts[i] + oldFinishes[i];// oldFinishes[i] is just duration

 }

function setSectionsArrayTimes(sectionsArray,startsArray,finishesArray){
   let l = sectionsArray.length;
   for(let j = 0;j<l;j++) setMLineArray(sectionsArray[j],startsArray[j],finishesArray[j]);
 }

 function setMLineArray(mLArray, start,finish){
   let len = mLArray.length;
   for(let i=0;i<len;i++) {
     mLArray[i].start = start;
     mLArray[i].finish = finish;
   }
 }



/*
      for (let i = 0; i < len; i++) {

        if(i>0) cocatSection(sectionsArray[i-1],sectionsArray[i]);

       // playSection(sectionsArray[i], origin);
      }

      let lenSectionsArray = sectionsArray.length;
      let lastMLineArray = sectionsArray[lenSectionsArray - 1];
      let audioStopTime = lastMLineArray[0].finish;

 */
      let audioStopTime = newFinishes[len-1];
      setTimeout(stoppingRecorder,audioStopTime*1000);
      setSectionsArrayTimes(sectionsArray,newStarts,newFinishes);
      for (let i = 0; i < len; i++) {

        playSection(sectionsArray[i], origin);
      }
       setSectionsArrayTimes(sectionsArray,oldStarts,oldFinishes);

 }




