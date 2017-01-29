var nodes = [];
var startNodeColour = "red";
var nodeTypes = [];
var rotationMap = {
  u : 0,
  ul:-60,
  ur:60,
  dr:120,
  d : 180,
  dl: -120
};

var nodeContainer = new createjs.Container();
stage.addChild(nodeContainer);
nodeContainer.x = 0;
nodeContainer.y = 0;
nodeContainer.setBounds(0,0, height, size);


nodeTypes.push({
  name: "startNode",
  onPulse: function(pulse){
    console.log(pulse);
  },
  onTick: function(){
    console.log("tick");
  },
  getShape: function(width){
    var graphics = new createjs.Graphics();
    graphics.beginFill(startNodeColour)
      .drawPolyStar(0,0,width/2,6,0,0);
    var shape = new createjs.Shape(graphics);
    return shape;
  }
});

function renderNodes(container,canvasWidth,canvasHeight,hexWidth,hexHeight){
  //container.children = [];
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    console.log(node);
    rndrX = node.getRenderX();
    rndrY = node.getRenderY();
    console.log("(" + rndrX + "," + rndrY + ")");
    yOffset = ((rndrX + 1) % 2) * (hexHeight/2);
    absX = hexWidth * (rndrX * 0.75) +  0.5* hexWidth;
    absY =  1 + hexHeight *(rndrY) + (0.5 * hexHeight) + yOffset;
    var shape = nodeTypes[node.typeId].getShape(hexWidth);
    console.log(shape);
    shape.x = absX;
    shape.y = absY;
    shape.regX = 0;
    shape.regY = 0;
    shape.rotation = rotationMap[node.direction];
    container.addChild(shape);
  }
}

function HexNode(x,y,direction,typeId,pulsePerBeat){
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.typeId = typeId;
  this.pulsePerBeat = pulsePerBeat;
  nodes.push(this);
}

HexNode.prototype.constructor = HexNode;
HexNode.prototype.getRenderX = function() {
  return this.x;
}

HexNode.prototype.getRenderY = function() {
  return this.y + Math.ceil(this.x/2);
}

