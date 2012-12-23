var World = (function () {
    function World(width, height) {
        this.width = width;
        this.height = height;
        this.interval = 10;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width * Cell.cellSize;
        this.canvas.height = height * Cell.cellSize;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.cells = new Array(width);
        for(var i = 0; i < width; i++) {
            this.cells[i] = new Array(height);
            for(var j = 0; j < height; j++) {
                var mo = Math.floor(Math.random() * 10) % 2;
                this.cells[i][j] = new Cell(mo == 0);
            }
        }
    }
    World.prototype.timeGoseBy = function () {
        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                this.cells[i][j].draw(this.ctx, i, j);
            }
        }
        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                this.cells[i][j].nextGeneration(i, j, this);
            }
        }
        this.start();
    };
    World.prototype.start = function () {
        var self = this;
        setTimeout(function () {
            self.timeGoseBy();
        }, 50);
    };
    return World;
})();
var Cell = (function () {
    function Cell(next) {
        this.now = false;
        this.next = false;
        this.next = next;
        this.now = next;
    }
    Cell.cellSize = 4;
    Cell.prototype.leftUp = function (x, y, world) {
        if(x - 1 < 0) {
            x = world.width;
        }
        if(y - 1 < 0) {
            y = world.height;
        }
        return world.cells[x - 1][y - 1].now ? 1 : 0;
    };
    Cell.prototype.left = function (x, y, world) {
        if(x - 1 < 0) {
            x = world.width;
        }
        return world.cells[x - 1][y].now ? 1 : 0;
    };
    Cell.prototype.leftDown = function (x, y, world) {
        if(x - 1 < 0) {
            x = world.width;
        }
        if(y + 1 >= world.height) {
            y = -1;
        }
        return world.cells[x - 1][y + 1].now ? 1 : 0;
    };
    Cell.prototype.rightUp = function (x, y, world) {
        if(x + 1 >= world.width) {
            x = -1;
        }
        if(y - 1 < 0) {
            y = world.height;
        }
        return world.cells[x + 1][y - 1].now ? 1 : 0;
    };
    Cell.prototype.right = function (x, y, world) {
        if(x + 1 >= world.width) {
            x = -1;
        }
        return world.cells[x + 1][y].now ? 1 : 0;
    };
    Cell.prototype.rightDown = function (x, y, world) {
        if(x + 1 >= world.width) {
            x = -1;
        }
        if(y + 1 >= world.height) {
            y = -1;
        }
        return world.cells[x + 1][y + 1].now ? 1 : 0;
    };
    Cell.prototype.up = function (x, y, world) {
        if(y - 1 < 0) {
            y = world.height;
        }
        return world.cells[x][y - 1].now ? 1 : 0;
    };
    Cell.prototype.down = function (x, y, world) {
        if(y + 1 >= world.height) {
            y = -1;
        }
        return world.cells[x][y + 1].now ? 1 : 0;
    };
    Cell.prototype.nextGeneration = function (x, y, world) {
        var aroundLivingCount = 0;
        aroundLivingCount += this.rightUp(x, y, world);
        aroundLivingCount += this.right(x, y, world);
        aroundLivingCount += this.rightDown(x, y, world);
        aroundLivingCount += this.leftUp(x, y, world);
        aroundLivingCount += this.left(x, y, world);
        aroundLivingCount += this.leftDown(x, y, world);
        aroundLivingCount += this.up(x, y, world);
        aroundLivingCount += this.down(x, y, world);
        switch(aroundLivingCount) {
            case 0:
            case 1:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8: {
                this.next = false;
                break;

            }
            case 2: {
                break;

            }
            case 3: {
                this.next = true;
                break;

            }
        }
    };
    Cell.prototype.draw = function (ctx, x, y) {
        this.now = this.next;
        if(this.next) {
            ctx.fillStyle = "#000000";
        } else {
            ctx.fillStyle = "#ffffff";
        }
        ctx.fillRect(x * Cell.cellSize, y * Cell.cellSize, Cell.cellSize, Cell.cellSize);
    };
    return Cell;
})();
window.onload = function () {
    var w = new World(100, 100);
    w.timeGoseBy();
};
