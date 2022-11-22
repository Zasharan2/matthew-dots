var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

window.addEventListener("keydown", this.globalKeyPressed, false);
window.addEventListener("keyup", this.globalKeyReleased, false);

function globalKeyPressed(event){
    keyPressed(event);
}
function globalKeyReleased(event){
    keyReleased(event);
}

var mouseX;
var mouseY;

window.addEventListener("mousemove", function(evt) {
    mouseX = evt.clientX - c.getBoundingClientRect().left;
    mouseY = evt.clientY - c.getBoundingClientRect().top;
});

var mouseIsPressed;
window.addEventListener("mousedown", function(){
    mouseIsPressed = true;
});

window.addEventListener("mouseup", function(){
    mouseIsPressed = false;
});

class point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

pointlist = [];

function renderpoint(p) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(p.x, p.y, 3, 3);
}

for (i = 0; i < 20; i++) {
    pointlist.push(new point(400 * Math.random(), 400 * Math.random()));
}

avg = new point(0, 0);

t = new point(40, 40);

sm = 5;

function draw() {
    if (mouseX) {
        t.x = mouseX;
    }
    if (mouseY) {
        t.y = mouseY;
    }

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255)";
    ctx.fillRect(0, 0, 400, 400);

    for (i = 0; i < pointlist.length; i++) {
        renderpoint(pointlist[i]);
    }

    avg.x = 0;
    avg.y = 0;
    for (i = 0; i < 20; i++) {
        avg.x += pointlist[i].x;
        avg.y += pointlist[i].y;
    }
    avg.x /= 20;
    avg.y /= 20;

    // calculation of wanted movement
    dx = (t.x - avg.x) / sm;
    dy = (t.y - avg.y) / sm;

    for (i = 0; i < 20; i++) {
        // each point moves towards target
        pointlist[i].x += (dx / 20);
        pointlist[i].y += (dy / 20);

        // random movement
        pointlist[i].x += 2 * (Math.random() - 0.5);
        pointlist[i].y += 2 * (Math.random() - 0.5);

        if (pointlist[i].x < 0) {
            pointlist[i].x = 0;
        }
        if (pointlist[i].y < 0) {
            pointlist[i].y = 0;
        }
        if (pointlist[i].x > 400) {
            pointlist[i].x = 400;
        }
        if (pointlist[i].y > 400) {
            pointlist[i].y = 400;
        }
    }
}

main = function(){
    draw();
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);