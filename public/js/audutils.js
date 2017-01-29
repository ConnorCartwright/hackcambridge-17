
var definterval = 0.5;

var allPossibleKeys = [  //range from from A#1 to F6
	'A#1','B1',	//Lowest notes
	'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
	'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
	'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
	'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
	'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6' //Highest notes
];

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
};

var map = mapCoordsToMidi(0,0);

function playChord(notelist, interval) { // [1, 2, 3, 4 and the like]
	MIDI.loadPlugin({
		soundfontUrl: "js/MIDI.js-master/examples/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.chordOn(0, notelist, velocity, delay);
			MIDI.chordOff(0, notelist, interval);
		}
	});
	
	
}

function playNote(key, interval) { // play the note for interval amount of time
    note = MIDI.keyToNote[key];
    MIDI.loadPlugin({
		soundfontUrl: "js/MIDI.js-master/examples/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, interval);
		}
	});
}

function getKey(coord) { //Gets the note from the associated coordinate in Human readable format (A0, A#0...)
	return map[coord]; 
}

function getNote(coord) { //Gets the note from the associated coordinate in MIDI readable format (1, 2, 3...)
	return keysToNote[map[coord]];
}

function playHex(coord) { //Plays the note of the associated hexagon coordinate
	playNote(map[coord], definterval);
}

//testing

//console.log(map["0,0"]);
//console.log();
//playNote(keyToNote(map["0,0"]));
