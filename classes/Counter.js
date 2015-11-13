function Counter(x, callback) {
    this._count = x;
    this._callback = callback;
    if(typeof callback != 'function' || typeof x != 'number')
        throw TypeError('wrong format');
}

Counter.prototype.count = function () {
    this._count--;
    if (this._count < 0)
        callback();
};

function loadImages(list, callback) {
    var imageList = {};
    var counter = new Counter(list.length, callback.bind(null, imageList));

    for (var imgName in list) {
        img = new Image(list[imgName]);
        img.onload = counter.count;
        img.onerror = counter.count;
        this._imageList[imgName] = img;
    }
}