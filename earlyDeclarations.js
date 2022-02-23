var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var player = new WebAudioFontPlayer();
    var gainNodeArray = []
    var maxTracks = 10;
