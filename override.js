var IS_MENU = true;
var DOT_CREATION_FREQ = 0;
var DOT_GROW_FREQ = 0;
keys = {
    leftArrow: 0,
    rightArrow: 0,
    upArrow: 0,
    downArrow: 0
};

function Dot(type, x, y, size, velocity) {
    var px = player.getX();
    var py = player.getY();

    this.size = size;
    this.y = px + y;
    this.x = py + x;
    this.type = type;
    this.color = colors[type];
    this.Vx = velocity[0];
    this.Vy = velocity[1];

    console.log(this.x, this.y)
}
Dot.prototype.grow = function () { }

var arr = [
    [0, 100, 0, 200, new Vector(0, 10)],
    [0, 0, -100, 200, new Vector(10, 0)],
    [0, -100, 0, 200, new Vector(0, -10)],
    [0, 0, 100, 200, new Vector(-10, 0)]
]

for(var dotAttr of arr)
    dots.create.apply(dots, dotAttr);


window.addEventListener('click', function (e) {
    var left = e.clientX;
    var top = e.clientY;
    var v = new Vector(left - canvas.width / 2, top - canvas.height / 2);
    if (v.getSize() < player.getR())
        location.href = 'game.html';

});

window.addEventListener('mousemove', function (e) {
    var left = e.clientX;
    var top = e.clientY;
    var v = new Vector(left - canvas.width / 2, top - canvas.height / 2);
    if (v.getSize() < player.getR())
        document.body.style.cursor = "pointer";
    else
        document.body.style.cursor = "default";


});

Player.prototype.draw = function () {
    var r = Math.sqrt(this._size) * (1 + Math.sin(game.getFrameNr() / 4) / 40);
    drawArc(ctx, canvas.width / 2, canvas.height / 2, r, colors[this._type]);

    ctx.font = '25px Arial';
    drawText(ctx, "PLAY", canvas.width / 2, canvas.height / 2, 'white', 'center', 'middle');
};


window.addEventListener('load', function () {
    var hash = window.location.hash;
    if (hash == '#win') {
        document.getElementById('win').style.visibility = 'visible';
        document.getElementById('win').addEventListener('click', function () {
            document.body.removeChild(this);
        });
    }
    if (hash == '#lose') {
        document.getElementById('win').style.visibility = 'visible';
        document.getElementById('win').innerText = "You Lose. Try again";
        document.getElementById('win').textContent = "You Lose";
        document.getElementById('win').addEventListener('click', function () {
            document.body.removeChild(this);
        });
    }
})