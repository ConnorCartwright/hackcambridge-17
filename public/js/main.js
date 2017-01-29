var bpm = 120;
var ms = 60000/bpm;
var velocity = 80;
var delay = 0.5;

setInterval(ms,function(){
  updatePulses();
  updateNodes();
  checkForCollisions();
  renderPulses(nodeContainer,hexWidth,hexHeight);
  renderNodes(nodeContainer,hexWidth,hexHeight);
  stage.update();
})

function checkForCollisions(){
  var notes = [];
  for(var i=0; i < pulses.length; i++){
    for(var j=0; j < nodes.length; j++){
      if (pulses[i].x == nodes[j].x && pulses[i].y == nodes[j].y){
        if(nodes[j].collide(pulses[i])){
          notes.push(getNote(nodes[j].x + "," + nodes[j].y));
        }
      }
    }
  }
  MIDI.setVolume(0,127);
  MIDI.chordOn(0,notes,velocity,0);
  MIDI.chordOff(0,notes,delay);
}
//global variable that tracks the current selected node, if any
var currSelectedNode = null;
