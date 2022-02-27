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
        playMLine(mLineArray[i], origin);
      }
    }

   function cocatSection(mLineArray1,mLineArray2) {

      // need to adjust start and finish of second array.
     // both arrays must be non empty of MLine objects.
      let len = mLineArray2.length;
      let st = mLineArray1[0].finish;
      let dur = mLineArray2[0].finish - mLineArray2[0].start;
      for (let i = 0; i < len; i++) {
       mLineArray2[i].start =st;
       mLineArray2[i].finish += dur;
      }
    }




    function playComposition(sectionsArray,origin){
   // takes an array holding several  sections (mLineArray s to play sequentially.

let len = sectionsArray.length;
      for (let i = 0; i < len; i++) {

        if(i>0) cocatSection(sectionsArray[i-1],sectionsArray[i]);

        playSection(sectionsArray[i], origin);
      }

      let lenSectionsArray = sectionsArray.length;
      let lastMLineArray = sectionsArray[lenSectionsArray - 1];
      let audioStopTime = lastMLineArray[0].finish;
      setTimeout(stoppingRecorder,audioStopTime*1000);

      for (let i = 0; i < len; i++) {

        playSection(sectionsArray[i], origin);
      }








 }




