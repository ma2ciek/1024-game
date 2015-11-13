function Game() {
    this._frameIndex = 0;
    this._paused = 0;
}
var _p = Game.prototype;

_p.play = function () {
    if (this._paused)
        return;
    dots.move();
    dots.grow();
    dots.tryCreate();
    player.move();

    canvas.clear();
    player.drawRange();
    player.draw();
    player.drawHighScore();
    dots.draw();


    this._frameIndex++;
    window.requestAnimationFrame(this.play.bind(this));
}

_p.over = function (success) {
    this._paused = 1;
    if (success) {
        window.location.href = 'index.html#win';
    }
    else {
        window.location.href = 'index.html#lose';
    }
}

_p.getFrameNr = function () {
    return this._frameIndex;
}

_p.init = function () {
    this._getCanvas();
    this._setCanvasSize();
    this._setCanvasEventHandlers();
    this._playAudio();
    this.play();
}

_p._playAudio = function () {
    var audio = new Audio();
    audio.src = 'ice.mp3'

    audio.addEventListener('canplaythrough', audio.play.bind(audio));
    audio.addEventListener('ended', audio.play.bind(audio))
}

_p._getCanvas = function () {
    canvas = document.getElementsByTagName('CANVAS')[0];
    ctx = canvas.getContext('2d');
}

_p._setCanvasSize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

_p._setCanvasEventHandlers = function () {
    window.addEventListener('resize', this._setCanvasSize);
}