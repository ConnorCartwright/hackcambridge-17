var stage, dist, rayon, texture, hexagons = [], hexagon;
stage = new createjs.Stage("canvas");
stage.enableMouseOver();

var windowWidth = $(window).width();
var windowHeight = $(window).height();

var size = (windowWidth <  windowHeight) ? windowWidth : windowHeight;
size -= 50;
$('#canvas').css('width', size + 'px');
$('#canvas').css('height', size + 'px');

var radius = (2*size)/12.25;
var width = 2* radius;
var height = width * (Math.sqrt(3)/2);

var manifest = [
    {src: "https://node-arm.herokuapp.com/images/nodejs.png", id: "penguin3"}
];

var longCol = false;
var numCols = 14;
var colLength;

var loader = new createjs.LoadQueue(false);
loader.addEventListener("complete", function() {
    console.log("hoooi!");
    for(var i = 0; i < numCols; i++){
        if(longCol) {
            colLength = 8;
            longCol = false;
        }else{
            colLength = 7;
            longCol = true;
        }
        for(var j=0; j < colLength; j++){
            hexagon = new Hexagon(i, j, radius, loader.getResult('penguin3'), stage);
            hexagons.push(hexagon);
            stage.addChild(hexagon);
        }

    }
    stage.hexagonsNumber = hexagons.length;
    stage.update();
});

loader.loadManifest(manifest);

function Hexagon(x, y, dist, texture, stage)
{
    createjs.Shape.call(this);
    this.coordsX = x;
    this.coordsY = y;
    this.dist = dist;
    this.texture = texture;
    this.stage = stage;

    this.drawShape();
}

Hexagon.prototype = new createjs.Shape();
Hexagon.prototype.constructor = Hexagon;

Hexagon.prototype.getShapeCoordinates = function()
{
    return {
        x: 50 + this.dist * (this.coordsX + this.coordsY / 2),
        y: 50 + Math.sqrt(3) * this.dist * this.coordsY / 2 ,
        radius: this.dist / Math.sqrt(3)
    };
};

Hexagon.prototype.drawShape = function()
{
    var shapeCoordinates = this.getShapeCoordinates();
    this.x = shapeCoordinates.x;
    this.y = shapeCoordinates.y;

    this.graphics
        .beginBitmapFill(this.texture, 'no-repeat')
        .beginStroke(createjs.Graphics.getRGB(0,0,0))
        .drawPolyStar(0,0, shapeCoordinates.radius, 6, 0, 30)
        .endFill();
    // this.rotation = -90;
};