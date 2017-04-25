const ctx = wx.createCanvasContext('firstCanvas');
var windowWidth;
var windowHeight;
var radius;

ctx.setStrokeStyle('#00ffff');
ctx.setLineWidth(17);
ctx.setLineCap('round');

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}
var timer;

function renderTime() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);

    //Background
    var gradient = ctx.createCircularGradient(radius, radius, radius + 50);

    /** background begin**/
    ctx.save();
    gradient.addColorStop(0, "#03303a");
    gradient.addColorStop(1, "black");
    ctx.setFillStyle(gradient);
    ctx.fillRect(0, 0, 500, 500);
    ctx.restore();
    /** background end**/

    /** text begin**/
    ctx.save();
    ctx.setShadow(0, 0, 2, '#28d1fa');
    //Date
    ctx.setFontSize(12);
    ctx.setFillStyle('rgba(00, 255, 255, 1)');
    ctx.fillText(today, windowWidth / 2 - 50, radius);

    //Time
    ctx.setFontSize(12);
    ctx.setFillStyle('rgba(00, 255, 255, 1)');
    ctx.fillText(time, windowWidth / 2 - 45, radius + 30);
    ctx.restore();
    /** text end**/

    /** hand begin**/
    ctx.save();
    ctx.setShadow(0, 0, 10, '#28d1fa');
    //Hours
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 50, degToRad(-90), degToRad((hrs * 30) - 90), false);
    ctx.stroke();

    //Minutes
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 80, degToRad(-90), degToRad((smoothmin * 6) - 90), false);
    ctx.stroke();

    //Seconds
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 110, degToRad(-90), degToRad((smoothsec * 6) - 90), false);
    ctx.stroke();
    ctx.restore();
    /** hand end**/
    ctx.draw(true);
}


Page({
    canvasIdErrorCallback: function(e) {
        console.error(e.detail.errMsg)
    },
    onReady: function(e) {
        wx.getSystemInfo({
            success: function(res) {
                windowWidth = res.windowWidth;
                windowHeight = res.windowHeight;
                radius = (windowWidth - 20) / 2;
            }
        });
    },
    onShow: function(e) {
        (function play() {
            if (timer) clearTimeout(timer);
            renderTime();
            return timer = setTimeout(play, 900);
        })();
    },
    onHide: function(e) {
        ctx.clearRect(0, 0, windowWidth, windowHeight)
        clearTimeout(timer);
    }
})