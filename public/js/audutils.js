
var allPossibleKeys = [  //range from from A#1 to F6
	'A#1','B1',	//Lowest notes
	'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
	'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
	'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
	'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
	'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6' //Highest notes
];

var keysToNote = {
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
	'F#1':66,
    'G1':67,
    'G#1':68,
    'A1':69,
	'A#0':70,
    'B0':71,
    'C1':72,
    'C#1':73,
    'D1':74,
    'D#1':75,
    'E1':76,
    'F1':77,
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
};


function playNote(note) {
    note = keysToNote[note];
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
		}
	});
}

//testing
//var map = mapCoordsToMidi(0,0);
//console.log(map["0,0"]);
//console.log();
//playNote(keyToNote(map["0,0"]));
