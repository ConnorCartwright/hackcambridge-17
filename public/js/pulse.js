var bpm = 120;
var period = 60000 / bpm;
var pulses = [];
var pulseColour = "rgba(150, 255, 0, 0.4)";

function updatePulses(){
  for(var i = 0; i < pulses.length; i++){
    pulses[i].update();
  }
}

function renderPulses(container,hexWidth,hexHeight){
 container.children = [];
  for(var i = 0; i < pulses.length;i++){
    var pulse = pulses[i]; 
    rndrX = pulse.getRenderX();
    rndrY = pulse.getRenderY();
    var yOffset = ((rndrX +1) % 2) * (hexHeight/2);
    absX = hexWidth * (rndrX * 0.75) + 0.5 * hexWidth;
    absY = 1 + hexHeight * rndrY + yOffset + (0.5 * hexHeight);
    var shape = new createjs.Shape(); 
    shape.graphics.beginFill(pulseColour)
      .drawPolyStar(0,0,hexWidth/2, 6,0,0)
      .endFill();
    shape.x = absX;
    shape.y = absY;
    container.addChild(shape);
  }
}

function PulseNode(x, y, direction, lifespan){
    this.x = x;
    this.y = y;
    this.lifespan = 8;
    this.direction = direction;
    this.vector = directionMap[direction];

    this.update = function(){
        this.x += this.vector.x;
        this.y += this.vector.y;
        this.lifespan--;
        if(this.lifespan <= 0) this.destroy();
    };

    this.destroy = function(){
      for(var i=0; i<pulses.length; i++){
        if(pulses[i]==this){
          pulses.splice(i,1);
          break;
        }
      } 
    };
    this.setDirection = function(direction){
      this.direction = direction;
      this.vector = directionMap[direction]
    }

    this.getRenderX = function(){
        return this.x;
    };

    this.getRenderY = function(){
        return this.y + Math.ceil(this.x/2);
    };

    pulses.push(this);

}

HexNode.prototype.constructor = HexNode;
HexNode.prototype.getRenderX = function() {
    return this.x;
}

HexNode.prototype.getRenderY = function() {
    return this.y + Math.ceil(this.x/2);
}


function collide(node,i){
  pulses[i].direction = node.direction;
  return true;
}





var timer = setInterval(period,updatePulses);
