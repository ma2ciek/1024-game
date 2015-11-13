var dirX = 0;
var dirY = 0;
var canvas;
var ctx;

var GRAVITY_FORCE = 0.005;
var DOT_CREATION_FREQ = 0.4;
var DOT_GROW_FREQ = 0.05;

var CHANGE_COLOR_CAST = 0.1;
var LIGHT_CAST = 0.01;
var ULTRA_SPEED_CAST = 0.1;
var MAX_DISTANCE = 6000;
var PLAYER_BASIC_RANGE = 400;
var PLAYER_START_SIZE = 100;
var PLAYER_END_SIZE = 1024;
var SIZE_COEFFICIENT = 6;

var keyboard = new Keyboard()
var keys = keyboard.getKeys();
var game = new Game();
var player = new Player();
var dots = new DotManager();

window.addEventListener('load', game.init.bind(game))

function getScreenPosition(o) {
    return {
        x: o.x - player.getX() + canvas.width / 2,
        y: o.y - player.getY() + canvas.height / 2
    }
    debugger;
}

function rand(x, y) {
    return Math.random() * [y-x] + x;
}

function chance(chance, fn, args) {
    if (Math.random() < chance)
        fn.apply(null, args);
}