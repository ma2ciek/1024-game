HTMLCanvasElement.prototype.clear = function () {
    var ctx = this.getContext('2d');
    ctx.clearRect(0, 0, this.width, this.height);
}


function drawArc(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawText(ctx, text, x, y, color, horizontalCenter, verticalCenter) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.textBaseline = verticalCenter;
    ctx.textAlign = horizontalCenter;
    ctx.fillText(text, x, y);
    ctx.closePath();
}
