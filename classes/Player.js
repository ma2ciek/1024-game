function Player() {
    this._size = PLAYER_START_SIZE;
    this._x = 100;
    this._y = 100;
    this._baseSpeed = 5;
    this._range = PLAYER_BASIC_RANGE;
    this._type = 1;
    this._handleEvents();
}
var _p = Player.prototype;

_p._handleEvents = function () {
    keyboard.watch('tab', this._toggleType.bind(this));
}

_p.getType = function () {
    return this._type;
}

_p._toggleType = function () {
    this._size = this._size * (1 - CHANGE_COLOR_CAST) | 0;
    this._type = (this._type + 1) % 2;
}

var colors = {
    0: 'red', // negative
    1: 'green', // positive
};


_p.draw = function () {
    var r = Math.sqrt(this._size) * (1 + Math.sin(game.getFrameNr() / 4) / 20);
    drawArc(ctx, canvas.width / 2, canvas.height / 2, r, colors[this._type]);
    drawText(ctx, this._size | 0, canvas.width / 2, canvas.height / 2, 'white', 'center', 'middle');
};

_p.drawRange = function () {
    var gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, this.getRange());
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    gradient.addColorStop(0, 'rgba(255,255,255,0.5)');
    drawArc(ctx, canvas.width / 2, canvas.height / 2, this.getRange(), gradient);
}

_p.move = function () {
    var speed = this._baseSpeed

    if (keys.shift) {
        speed *= 2;
        this._size -= ULTRA_SPEED_CAST;
    }

    this._size -= LIGHT_CAST;


    this._x += speed * (keys.rightArrow - keys.leftArrow);
    this._y += speed * (keys.downArrow - keys.upArrow);

    var dotList = dots.getAll();
    for (var i = 0; i < dotList.length; i++) {
        var dot = dotList[i];
        if ((this._x - dot.x) * (this._x - dot.x) + (this._y - dot.y) * (this._y - dot.y) <= Math.max(this._size, dot.size)) {
            if (dot.type == this._type)
                this._size += dot.size;
            else {
                this._size -= dot.size;
                if (this._size <= 0) {
                    this._size = 0;
                    game.over();
                }
            }

            dotList.splice(i, 1);
            i--;
        }
    }
}

_p.see = function (o) {
    var squareSum = (this._x - o.x) * (this._x - o.x) + (this._y - o.y) * (this._y - o.y);
    return squareSum < this._range * this._range
}

_p.getX = function () {
    return this._x;
}
_p.getY = function () {
    return this._y;
}
_p.getR = function () {
    return Math.sqrt(this._size);
}

Player.prototype.getRange = function () {
    return this._range + Math.sqrt(this._size);
}