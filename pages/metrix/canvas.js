var windowWidth, windowHeight, app;

class CanvasApp {
    constructor() {
        this.yPosArray = Array(300).fill(0);
        this.ctx = wx.createCanvasContext('thirdCanvas');
        this.w = windowWidth;
        this.h = windowHeight;
        this.timer;
    }

    draw() {
        this.ctx.setFillStyle('rgba(0,0,0,.05)');
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.setFillStyle('rgb(0, 255, 0)');
        this.ctx.setFontSize(10);

        this.yPosArray.map((y, index) => {
            let text = String.fromCharCode(1e2 + Math.random() * 1e2);
            let x = (index * 10) + 10;
            this.ctx.fillText(text, x, y);
            this.ctx.draw(true);
            if (y > 100 + Math.random() * 1e4) {
                this.yPosArray[index] = 0;
            } else {
                this.yPosArray[index] = y + 10;
            }
        });
    }
    run() {
        if (!this.ctx) return;
        var self = this;

        function runAnime() {
            if (self.timer) {
                clearTimeout(self.timer);
            }
            self.draw();
            return self.timer = setTimeout(runAnime, 100);
        }
        runAnime();
    }
    stop() {
        clearTimeout(this.timer);
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
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
            }
        });
    },
    onShow: function(e) {
        app = new CanvasApp('metrix');
        app.run();
    },
    onHide: function(e) {
        app.stop();
    }
})