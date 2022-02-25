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
      setTimeout(stoppingRecorder,(mLineArray[0].finish)*1000);
      playSection(mLineArray, origin);

    }//main PLAY it function !!!!!!!
