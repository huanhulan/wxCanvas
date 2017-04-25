const ctx = wx.createCanvasContext('secondCanvas');
var radius;
var timer;
var windowWidth;
var windowHeight;
// Draw the Clock 
function render() {
    drawFace(ctx, radius);
    drawTime(ctx, radius);
    drawNose(ctx, radius);
    ctx.save();
    drawNumbers(ctx, radius);
    ctx.restore();
    ctx.draw(true);
}

// Define how to draw the Face
function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.setFillStyle("#F8F8FF");
    ctx.fill();
}

// Define how to draw the Numbers
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    // Define the text styles
    ctx.setFontSize(14);
    ctx.setFillStyle("#000000");
    // ctx.textBaseline = "middle";
    ctx.setTextAlign('center');

    // Rotate and put number and rotate back
    for (num = 1; num <= 12; num++) {
        ang = num * Math.PI / 6;
        ctx.save();
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
        ctx.restore();
    }
}

// Draw the Hands depends on current time
function drawTime(ctx, radius) {
    // Get the current time
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // Draw the Hour Hand
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.4, 4, "black");
    // Draw the Minute Hand
    minute = (minute * Math.PI / (30)) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.6, 2, "black");
    // Draw the Second Hand
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.75, 1, "#DC143C");
}

// Define how to draw the Hands
function drawHand(ctx, pos, length, width, color) {
    ctx.beginPath();
    ctx.setLineWidth(width);
    ctx.setLineCap('round');
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.setStrokeStyle(color);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawNose(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * .08, 0, 2 * Math.PI);
    ctx.setFillStyle("#DC143C");
    ctx.fill();
}

Page({
    canvasIdErrorCallback: function(e) {
        console.error(e.detail.errMsg)
    },
    onReady: function(e) {
        // Defint the canvas
        // Define some size
        wx.getSystemInfo({
            success: function(res) {
                // Center the ctx
                windowWidth = res.windowWidth;
                windowHeight = res.windowHeight;
                radius = (windowWidth - 20) / 2;
                // Draw the Clock every second
                timer = setInterval(render, 1000);
                ctx.translate(windowWidth / 2, windowHeight / 2);
            }
        });
    },
    onShow: function(e) {
        wx.getSystemInfo({
            success: function(res) {
                // Center the ctx
                // Draw the Clock every second
                timer = setInterval(render, 1000);
            }
        });
    },
    onHide: function(e) {
        ctx.clearRect(0, 0, windowWidth, windowHeight)
        clearInterval(timer);
    }
})