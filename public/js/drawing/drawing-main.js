var startX = 0;
var startY = 0;

function setup() {
    createCanvas(800, 800);
    background(222);

    setupHexagons();
}

function setupHexagons() {
    var hexWidth = width / 14;
    var hexRadius = hexWidth / 2;

    startX = hexRadius;
    startY = hexRadius;



    for (var i = 0; i < 1; i++) {
        console.log('startX: ' + startX);
        console.log('startY: ' + startY);
        translate(startX, startY);
        var a = ellipse(50, 50, 60, 60);
        polygon(startX, startY, hexRadius, 6);
        console.log(a);
        console.log(a.x);
        pop();
        startY += hexRadius;
    }
}



function draw() {



}

function polygon(x, y, radius, npoints) {
    var angle = TWO_PI / npoints;
    var test = beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        var sx = x + cos(a) * radius;
        var sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    fill('red');
    endShape(CLOSE);

    return test;
}