
var windowWidth = $(window).width();
var windowHeight = $(window).height();

var size = (windowWidth <  windowHeight) ? windowWidth : windowHeight;

var radius = (2*size)/12.25;
var width = 2* radius;
var height = width * (Math.sqrt(3)/2);

var manifest = {
  {src: "https://node-arm.herokuapp.com/images/nodejs.png", id: "penguin3"};
}

var longCol = false;

var loader = new createjs.LoadQueue(false);

loader.addEventListner("complete",function() {
  if(longCol) {
    colLength = 8;
    longCol = false;
  }else{
    colLength = 7;
    longCol = true;
  }

  for(var y=0; y < colLength; y++){
    for(var x =-Math.floor(y/2); x < -Math.floor(y/2) + 10; x++){
      hexagon = new Hexagon(x, y, d)
    }
  }

})

function Hexagon(x,y, dist, texture, stage){
  createjs.Shape.call(this);
  this.coordsX = x;
  this.coordsY = y;
  this.texture = texture;
  this.stage = stage;
  this.drawShape();
}

Hexagon.prototype = new createjs.Shape();
Hexagon.prototype.constructor = Hexagon;
Hexagon.prototype.getAbsolutePosition = function() {
  
}
