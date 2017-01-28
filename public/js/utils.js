var HexGeom = {
  xScale : Math.sqrt(3) / 2,
  toCanvasCoord: function(hexX,hexY,CanvasGeom){
    var canvasCoord = {};
    canvasCoord.x = CanvasGeom.height * xScale * hexX;
    canvasCoord.y = CanvasGeom.height * (hexY + 0.5 * hexX);
    return canvasCoord;
  }
}

var CanvasGeom = {
  hexHeight : 1,
  offsetX : 0,
  offsetY : 0
}
