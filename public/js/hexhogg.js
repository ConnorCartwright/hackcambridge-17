var bpm = 120;
var period = 60000 / bpm;
var pulses = [];

function update(){
  for(var i = 0; i < pulses.length; i++){
    pulses[i].update();
  }
}

function makePulse(x,y,updateVector){
  var pulse = {
    x: x,
    y: y,
    vector: updateVector,
    update: function(){
      this.x += updateVector.x;
      this.y += updateVector.y;
    }
  }
  pulses.push(pulse);
}

var timer = setInterval(period,update);
