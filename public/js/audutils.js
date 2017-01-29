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

var startingIndex = 45; // we start from G4
var currIndex = startingIndex; //maps the current index
var currX = 0;
var currY = 0;

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

console.log(map);

//function getNote(coord) {
//	for (var i in coordList) {
//		if(coordList[i]===coord) {
//			return coordList[i];	
//		}
//	}
//	
//}
