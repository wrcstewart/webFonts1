 var origin;// this is used by soundfont player to find current time zero in the audio context

    {
      //player.loader.decodeAfterLoading(audioContext,'_tone_0000_JCLive_sf2_file' );
      player.loader.decodeAfterLoading(audioContext, '_tone_0730_Aspirin_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_47_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_tone_0760_Aspirin_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_35_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_38_0_Chaos_sf2_file');
      player.loader.decodeAfterLoading(audioContext, '_drum_42_0_Chaos_sf2_file');
    }//loading player DON'T FORGET TO DO THIS !



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
