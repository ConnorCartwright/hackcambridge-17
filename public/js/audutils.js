//https://github.com/mudcube/MIDI.js/
//MIDI.keyToNote = object; // A0 => 21

var allPossibleKeys = [  //range from from A#0 to F5
	'A#0','B0',	//Lowest notes
	'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
	'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
	'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
	'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
	'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5' //Highest notes
];

var keysToNote = {
    "A#0":10,
    "B0":11,
    "C1":12,
    "C#1":13,
    'D1':14,
    'D#1':15,
    'E1':16,
    'F1':17,
    'F#1':18,
    'G1':19,
    'G#1':20,
    'A1':21,
    'A#1':22,
    'B1':23,
	'C2':24,
    'C#2':25,
    'D2':26,
    'D#2':27,
    'E2':28,
    'F2':29,
    'F#2':30,
    'G2':31,
    'G#2':32,
    'A2':33,
    'A#2':34,
    'B2':35,
	'C3':36,
    'C#3':37,
    'D3':38,
    'D#3':39,
    'E3':40,
    'F3':41,
    'F#3':42,
    'G3':43,
    'G#3':44,
    'A3':45,
    'A#3':46,
    'B3':47,
	'C4':48,
    'C#4':49,
    'D4':50,
    'D#4':51,
    'E4':52,
    'F4':53,
    'F#4':54,
    'G4':55,
    'G#4':56,
    'A4':57,
    'A#4':58,
    'B4':59,
	'C5':60,
    'C#5':61,
    'D5':62,
    'D#5':63,
    'E5':64,
    'F5':65
}

var mapCoordsToMidi = function(startingX, startingY) {
    var startingIndex = 45; // we start from G4
    var currIndex = startingIndex; //maps the current index
    var currX = startingX;
    var currY = startingY;
    var maxRows = 14;
    var maxCol = 8;
    var map = {};

    //go through each column
    for(var i = 0; i < maxRows; i++) {
        var currRow = i;

        //store initial coordinates and notes
        var prevX = currX;
        var prevY = currY;
        var prevIndex = currIndex;


        //check if it is an even row
        //if so, we minus 1 from column size
        var currColIndex = maxCol;
        if(i % 2 == 0)
            currColIndex--;

        //go through each hexagon in column
        for(var x = 0; x < currColIndex; x++) {

            //map note to coordinate
            var currCoord = currX + "," + currY;
            map[currCoord] = allPossibleKeys[currIndex];

            //move to next coordinate, and move note 7 semitones down
            currY++;
            currIndex -= 7;
        }

        //check if it is an even row
        if(i%2 == 0) {
            //move coordinates up to the start of the next column
            currX = prevX + 1;
            currY = prevY - 1;

            //move note up 4 semitones
            currIndex = prevIndex+4;

        //if it is an odd row
        } else {
            //move coordinates up to the start of the next column
            currX = prevX + 1;
            currY = prevY;

            //move note down 3 semitones
            currIndex = prevIndex-3;
        }

    }
    return map;
}

function keyToNote(key) {
    return keysToNote[key];
}

function playNote(note) {
    MIDI.loadPlugin({
		soundfontUrl: "./MIDI.js-master/examples/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
		}
	});
}

//testing
//var map = mapCoordsToMidi(0,0);
//console.log(map["0,0"]);
//console.log();
//playNote(keyToNote(map["0,0"]));