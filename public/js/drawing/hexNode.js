var nodes = [];
var nodeTypes = [];

nodeTypes.push({
  name: "startNode",
  onPulse: function(pulse){
    
  },
  onTick: function(){

  }
  getShape: function(width){
    var shape = new createjs.Shape();
    return shape.beginFill(startNodeColour)
      .drawPolyStar(0,0,width/2,6,0,0)
      .endFill();
  }
})

function renderNodes(container,canvasWidth,canvasHeight,hexWidth,hexHeight){
  container.children = [];
  for(var i = 0; i < nodes.length; i++){
    var node = nodes[i];
    rndrX = node.getRenderX();
    rndrY = node.getRenderY();
    absX = hexWidth * (rndrX * 0.75) + (0.5 * hexWidth);
    absY = (hexHeight * rndrY) + (((hexWidth + 1) % 2) * 0.5 * hexHeight) + (0.5 * hexHeight);
    var shape = nodeType[node.typeId].getShape(width);
    shape.x = absX;
    shape.y = absY;
    container.addChild(shape);
  }
}

function HexNode(x,y,direction,typeId,pulsePerBeat){
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.typeId = typeId;
  this.pulsePerBeat = pulsePerBeat;
  this.getRenderX = function() {
    return this.x
  };
  this.getRenderY = function() {
    return this.y + Math.ceil(this.x/2);
  }
  this.render = function(container,height,width){
    return 
  }
  nodes.push(this);
  return this;
}
