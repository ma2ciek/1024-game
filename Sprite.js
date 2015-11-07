function Sprite(img, frameWidth, speed, frameCenter, isLooped) {
    this._width = frameWidth;
    this._height = img.height;
    this._index = 0;
    this._animationLength = img.width / frameWidth;
    this._frameCenter = frameCenter || { x: this._width / 2, y: this._height / 2 };
    this._isLooped = isLooped || false;
    this._img = img;
    this._frequency = 1000 / speed; // speed - [frames / second]
    this._timeStamp = Date.now();
}

_p = Sprite.prototype;

_p.animate = function () {
    if ((Date.now() - this._timeStamp) > this._frequency) {
        this.nextFrame();
        this._timeStamp = Date.now();
    }
}

_p.nextFrame = function () {
    if (isLooped)
        this._index = (this._index + 1) % this._animationLength;
    else
        this._index = Math.max(this._index + 1, this._animationLength - 1);
}

_p.draw = function (ctx, x, y) {
    var imageX = x - this._frameCenter.x;
    var imageY = y - this._frameCenter.y;
    var w = this._width;
    var h = this._height;
    ctx.drawImage(img, this._index * w, 0, w, h, imageX, imageY, w, h);
}
