var stage, dist, rayon, texture, hexagons = [], hexagon;


var windowWidth = $(window).width();
var windowHeight = $(window).height();

var size = (windowWidth <  windowHeight) ? windowWidth : windowHeight;
size -= 50;
var hexWidth = size / 10.75;
var hexRadius = hexWidth / 2;
var hexHeight = hexWidth * (Math.sqrt(3)/2);

var height = hexHeight * 8 + 3;

stage = new createjs.Stage("canvas");
stage.enableMouseOver();
stage.canvas.height = height;
stage.canvas.width = size;



console.log('Initialised radius as: ' + hexRadius);


var manifest = [
    {src: "https://node-arm.herokuapp.com/images/nodejs.png", id: "penguin3"}
];

var longCol = false;
var numCols = 14;
var yOffset;
var colLength;

var loader = new createjs.LoadQueue(false);
loader.addEventListener("complete", function() {
    for(var i = 0; i < numCols; i++){
        if(longCol) {
            colLength = 8;
            yOffset = 0;
            longCol = false;
        }else{
            colLength = 7;
            yOffset = hexHeight / 2;
            longCol = true;
        }

        for(var j = 0; j < colLength; j++){
            hexagon = new Hexagon(i, j, hexRadius, yOffset, loader.getResult('penguin3'), stage);
            hexagon.addEventListener('click', function() {
              console.log('tits');
            });
            hexagons.push(hexagon);
            stage.addChild(hexagon);
            // hexStartY += hexHeight;
        }
        // hexStartX += hexWidth * 0.75;


    }
    stage.hexagonsNumber = hexagons.length;
    stage.update();
});

loader.loadManifest(manifest);

function Hexagon(gridX, gridY, hxRadius, yOffset, texture, stage)
{
    createjs.Shape.call(this);
    this.coordsX = gridX;
    this.coordsY = gridY;
    this.hxRadius = hxRadius;
    this.texture = texture;
    this.stage = stage;

    this.drawShape();
}

Hexagon.prototype = new createjs.Shape();
Hexagon.prototype.constructor = Hexagon;

Hexagon.prototype.getShapeCoordinates = function()
{
    return {
        x: hexWidth * ((this.coordsX) * 0.75) + 0.5 * hexWidth,
        y: 1 + hexHeight * ((this.coordsY)) + yOffset + (0.5 * hexHeight),
        radius: this.hxRadius
    };
};

Hexagon.prototype.drawShape = function()
{
    var shapeCoordinates = this.getShapeCoordinates();
    this.x = shapeCoordinates.x;
    this.y = shapeCoordinates.y;

    console.log('drawing radius is: ' + shapeCoordinates.radius);

    this.graphics
        // .beginBitmapFill(this.texture, 'no-repeat')
        .beginStroke(createjs.Graphics.getRGB(0,0,0))
        .beginFill("rgba(222, 222, 222, 0.5)")
        .drawPolyStar(0,0, shapeCoordinates.radius, 6, 0, 0)
        .endFill();
    // this.rotation = -90;
};












