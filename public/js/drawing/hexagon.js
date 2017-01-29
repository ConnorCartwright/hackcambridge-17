var hexWidth;
var stage, dist, rayon, texture, hexagons = [], hexagon;
var hexHeight;
var nodeContainer, hexContainer;


function generateHexGrid() {

    $('.hexContainer')
        .empty()
        .append('<canvas id="canvas" class="myCanvas"></canvas>');

    $('.myCanvas').hide().fadeIn(2000);


    var windowWidth = $('.hexContainer').width();
    console.log('WINDOW WIDTH: ' + windowWidth);
    var windowHeight = $('.hexContainer').height();
    console.log('WINDOW HEIGHT: ' + windowHeight);

    var size = (windowWidth <  windowHeight) ? windowWidth : windowHeight;
    var margin = 50;
    size -= margin;
    hexWidth = size / 10.75;
    var hexRadius = hexWidth / 2;
    hexHeight = hexWidth * (Math.sqrt(3)/2);

    var height = hexHeight * 8 + 3;

    stage = new createjs.Stage("canvas");
    stage.enableMouseOver();
    stage.canvas.height = height;
    stage.canvas.width = size;

    hexContainer = new createjs.Container();
    stage.addChild(hexContainer);
    hexContainer.x = 0;
    hexContainer.y = 0;
    hexContainer.height = height;
    hexContainer.width = size;

    nodeContainer = new createjs.Container();
    stage.addChild(nodeContainer);
    nodeContainer.x = 0;
    nodeContainer.y = 0;
    nodeContainer.height = height;
    nodeContainer.width = size;

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
                (function(hexagon){ 
                  hexagon.addEventListener('click',function() {
                    console.log('tits');
                    var nodeId = 0;
                    var lCoords = toLogicalCoords(hexagon.coordsX,hexagon.coordsY);
                    console.log(lCoords.y);
                    var hn = new HexNode(lCoords.x, lCoords.y, 'u',nodeId,1);
                    nodes.push(hn);
                    renderNodes(nodeContainer,hexWidth,hexHeight);
                    stage.update();
                  });
                  hexagons.push(hexagon);
                  hexContainer.addChild(hexagon);
                }(hexagon));
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

    function toLogicalCoords(x,y){
      return {
        x: x,
        y: y - Math.ceil(x/2)
      }
    };

    function toRenderCoords(x,y){
      return {
        x: x,
        y: y + Math.ceil(x/2)
      }
    };
}
