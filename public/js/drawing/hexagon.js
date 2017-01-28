var stage, dist, rayon, texture, hexagons = [], hexagon;
stage = new createjs.Stage("canvas");
stage.enableMouseOver();

var windowWidth = $(window).width();
var windowHeight = $(window).height();

var size = (windowWidth < windowHeight) ? windowWidth : windowHeight;

var dist = size / 16;

console.log('Window size: ' + size);
console.log('Window dist: ' + dist);

var manifest = [
    {src: "https://node-arm.herokuapp.com/images/nodejs.png", id: "penguin3"}
];

var longCol = false;

var loader = new createjs.LoadQueue(false);
loader.addEventListener("complete", function() {
    if (longCol) {
        colLength = 8;
        longCol = false;
    } else {
        colLength = 7;
        longCol = true;
    }

    for (var y = 0; y < colLength; y++) {
        console.log('creating y?');
        for (var x=-Math.floor(y/2); x < -Math.floor(y/2)+10; x++) {
            hexagon = new Hexagon(x, y, dist, loader.getResult('penguin3'), stage);
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