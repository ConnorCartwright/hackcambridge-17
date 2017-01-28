var HexGeom = {
  xScale : Math.sqrt(3) / 2,
  toCanvasCoord: function(hexX,hexY,CanvasGeom){
    var canvasCoord = {};
    console.log(this.xScale);
    canvasCoord.x = CanvasGeom.offsetX + CanvasGeom.hexHeight * this.xScale * hexX;
    canvasCoord.y = CanvasGeom.offsetY + CanvasGeom.hexHeight * (hexY + 0.5 * hexX);
    return canvasCoord;
  }
}

var CanvasGeom = {
  hexHeight : 1,
  offsetX : 0,
  offsetY : 0
}
