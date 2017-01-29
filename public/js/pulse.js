var bpm = 120;
var period = 60000 / bpm;
var pulses = [];
var pulseColour = "#39FF1480"

function update(){
  for(var i = 0; i < pulses.length; i++){
    pulses[i].update();
  }
}

function renderPulses(container,canvasWidth,canvasHeight,hexWidth,hexHeight){
  container.children = [];
  for(var i = 0; i < pulses.length){
    var pulse = pulses[i]; 
    rndrX = pulse.getRenderX();
    rndrY = pulse.getRenderY();
    absX = hexWidth * (rndrX * 0.75) + 0.5 * hexWidth;
    absY = (hexHeight * rndrY) + (((hexWidth + 1) % 2) * 0.5 * hexHeight) + (0.5 * hexHeight);
    var shape = new createjs.Shape(); 
    shape.graphics.beginFill(pulseColour)
      .drawPolyStar(0,0,hexWidth/2, 6,0,0);
      .endFill();
    shape.x = absX;
    shape.y = absY;
    container.addChild(shape);
  }
}

function makePulse(x,y,updateVector){
  this.x = x;
  this.y = y;
  this.lifespan = 8;
  this.vector = updateVector;
  this.update = function(){
    this.x += updateVector.x;
    this.y += updateVector.y;
    this.lifespan--;
    if(lifespan <= 0) this.destroy();
  }
  this.destroy = function(){
    pulses.remove(this);
  }
  this.getRenderX = function(){
    return this.x;
  }
  this.getRenderY = function(){
    return this.y + Math.ceil(this.x/2);
  }
  pulses.push(this);
  return this
}

var timer = setInterval(period,update);
