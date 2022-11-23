// matthew dots

// document functions
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

// key press functions
window.addEventListener("keydown", this.globalKeyPressed, false);
window.addEventListener("keyup", this.globalKeyReleased, false);

function globalKeyPressed(event){
    keyPressed(event);
}
function globalKeyReleased(event){
    keyReleased(event);
}

keys = [];

window.keyPressed = function(event){
    keys[event.keyCode] = true;
};
window.keyReleased = function(event){
    keys[event.keyCode] = false;
};

// mouse pos functions
var mouseX;
var mouseY;

window.addEventListener("mousemove", function(evt) {
    mouseX = evt.clientX - c.getBoundingClientRect().left;
    mouseY = evt.clientY - c.getBoundingClientRect().top;
});

// mouse click functions
var mouseIsPressed;
window.addEventListener("mousedown", function(){
    mouseIsPressed = true;
});

window.addEventListener("mouseup", function(){
    mouseIsPressed = false;
});

// point definition
class point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

pointlist = []; // list of points

ps = 3; // pointsize

function renderpoint(p) {
    // draw point
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(p.x, p.y, ps, ps);
}

dotcount = 20; // (user controlled)

cw = 400; // canvas width
ch = 400; // canvas height

for (i = 0; i < dotcount; i++) {
    pointlist.push(new point(cw * Math.random(), ch * Math.random())); // add dots randomly
}

avg = new point(0, 0); // average

rc = 5; // randomness coefficient (user controlled)

t = new point(200, 200); // target (user controlled)

sm = 5; // smoothness

time = Date.now();

function draw() {
    // set target to mouse
    if (mouseX) {
        t.x = mouseX;
    }
    if (mouseY) {
        t.y = mouseY;
    }

    // background
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255)";
    ctx.fillRect(0, 0, cw, ch);

    // render points
    for (i = 0; i < pointlist.length; i++) {
        renderpoint(pointlist[i]);
    }

    // calculation of average point
    avg.x = 0;
    avg.y = 0;
    for (i = 0; i < dotcount; i++) {
        avg.x += pointlist[i].x;
        avg.y += pointlist[i].y;
    }
    avg.x /= dotcount;
    avg.y /= dotcount;

    // overall movement to target
    dx = (t.x - avg.x) / sm;
    dy = (t.y - avg.y) / sm;

    for (i = 0; i < dotcount; i++) {
        // distribution of overall movement to points
        pointlist[i].x += (dx / dotcount);
        pointlist[i].y += (dy / dotcount);

        // random movement
        pointlist[i].x += rc * (Math.random() - 0.5);
        pointlist[i].y += rc * (Math.random() - 0.5);

        // xy clamping
        if (pointlist[i].x < 0) {
            pointlist[i].x = 0;
        }
        if (pointlist[i].y < 0) {
            pointlist[i].y = 0;
        }
        if (pointlist[i].x > (cw - ps)) {
            pointlist[i].x = (cw - ps);
        }
        if (pointlist[i].y > (ch - ps)) {
            pointlist[i].y = (ch - ps);
        }
    }

    // user control of randomness
    if (keys[65]) {
        rc -= Math.log(rc + 1) * 0.01;
    }
    if (keys[68]) {
        rc += Math.log(rc + 1) * 0.01;
    }
    if (rc < 0) {
        rc = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.font = "10px Arial";
    ctx.fillText("Randomness: " + Math.round((rc + Number.EPSILON) * 100) / 100, 10, 20);

    // user control of dot count
    if (keys[87] && (Date.now() - time) > 250) {
        pointlist.push(new point(mouseX, mouseY));
        dotcount++;
        time = Date.now();
    }
    if (keys[83] && (Date.now() - time) > 250) {
        pointlist.pop();
        dotcount--;
        time = Date.now();
    }
    if (dotcount < 0) {
        dotcount = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.font = "10px Arial";
    ctx.fillText("Dots: " + Math.round((dotcount + Number.EPSILON) * 100) / 100, 10, 40);
}

// loop
main = function(){
    draw();
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);