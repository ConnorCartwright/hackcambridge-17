var bpm = 120;
var ms = 60000/bpm;
var velocity = 80;
var delay = 0.5;

  
function updateAll(){
  updatePulses();
  updateNodes();
  checkForCollisions();
  renderPulses(nodeContainer,hexWidth,hexHeight);
  renderNodes(nodeContainer,hexWidth,hexHeight);
  stage.update();
};

function checkForCollisions(){
  var notes = [];
  for(var i=0; i < pulses.length; i++){
    for(var j=0; j < nodes.length; j++){
      console.log("(" + pulses[i].x+ "," + pulses[i].y+ ") (" +nodes[j].x + "," + nodes[j].y+ ")")
      if (pulses[i].x == nodes[j].x && pulses[i].y == nodes[j].y){
        if(nodes[j].collide(pulses[i])){
          notes.push(getNote(nodes[j].x+","+nodes[j].y));
        }
      }
    }
  }
  console.log("Notes" + notes);
  playChord(notes,0.5);
  //MIDI.setVolume(0, 127);
  //MIDI.chordOn(0,notes,velocity,0);
  //MIDI.chordOff(0,notes,delay);
}
var interval = setInterval(updateAll,ms);
var on = true;

$('.toolbarTool').on('click',function() {
  if(on){
    console.log("TURNING OFF");
    clearInterval(interval);
    on = false;
    pulses = [];
    for(var i =0 ; i < nodes.length; i++){
      if (nodes[i].counter != undefined) nodes[i].counter = 0;
      console.log("Setting counter to 0");
    }
    renderPulses(nodeContainer,hexWidth,hexHeight);
    renderNodes(nodeContainer,hexWidth,hexHeight);
    stage.update();
  }else{
    console.log("TURNING ON");
    on = true;
    interval = setInterval(updateAll,ms);
  }
})
