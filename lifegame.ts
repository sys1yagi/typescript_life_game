
/**
* ライフゲームの世界。ボード
*/
class World{
	interval: number = 10;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	cells: Cell[][];
	constructor(public width:number, public height:number){
		this.canvas = <HTMLCanvasElement>document.createElement("canvas");
		this.canvas.width=width*Cell.cellSize;
		this.canvas.height=height*Cell.cellSize;
		this.ctx = this.canvas.getContext("2d");
		document.body.appendChild(this.canvas);
		this.cells = new Array(width);
		for(var i = 0; i < width; i++){
			this.cells[i] = new Array(height);
			for(var j = 0; j < height; j++){
				var mo = Math.floor( Math.random()*10)%2;
				this.cells[i][j] = new Cell(mo==0);
			}
		}
	}
	timeGoseBy(){
		for(var i = 0; i < this.width; i++){
			for(var j = 0; j < this.height; j++){
				this.cells[i][j].draw(this.ctx, i, j);
			}
		}
		for(var i = 0; i < this.width; i++){
			for(var j = 0; j < this.height; j++){
				this.cells[i][j].nextGeneration(i, j, this);
			}
		}
		this.start();
	}	
	start(){
		var self = this;
		setTimeout(function(){self.timeGoseBy();}, 50);
	}
}
/**
* 細胞
*/
class Cell{
	static cellSize: number = 4;
	public now: bool = false;
	public next: bool = false;
	constructor (next: bool){
		this.next = next;
		this.now = next;
	};
	leftUp(x:number, y:number, world:World){
		if(x-1 < 0){
			x = world.width;
		}
		if(y-1 < 0){
			y = world.height;
		}
		return world.cells[x-1][y-1].now ? 1 : 0;
	}
	left(x:number, y:number, world:World){
		if(x-1 < 0){
			x = world.width;
		}
		return world.cells[x-1][y].now ? 1 : 0;
	}
	leftDown(x:number, y:number, world:World){
		if(x-1 < 0){
			x = world.width;
		}
		if(y+1 >= world.height){
			y = -1;
		}
		return world.cells[x-1][y+1].now ? 1 : 0;
	}
	rightUp(x:number, y:number, world:World){
		if(x+1 >= world.width){
			x = -1;
		}
		if(y-1 < 0){
			y = world.height;
		}
		return world.cells[x+1][y-1].now ? 1 : 0;
	}
	right(x:number, y:number, world:World){
		if(x+1 >= world.width){
			x = -1;
		}
		return world.cells[x+1][y].now ? 1 : 0;
	}
	rightDown(x:number, y:number, world:World){
		if(x+1 >= world.width){
			x = -1;
		}
		if(y+1 >= world.height){
			y = -1;
		}
		return world.cells[x+1][y+1].now ? 1 : 0;
	}
	up(x:number, y:number, world:World){
		if(y-1 < 0){
			y = world.height;
		}
		return world.cells[x][y-1].now ? 1 : 0;
	}
	down(x:number, y:number, world:World){
		if(y+1 >= world.height){
			y = -1;
		}
		return world.cells[x][y+1].now ? 1 : 0;
	}
	nextGeneration(x:number, y:number, world:World){
		var aroundLivingCount = 0;
		aroundLivingCount += this.rightUp(x, y, world);
		aroundLivingCount += this.right(x, y, world);
		aroundLivingCount += this.rightDown(x, y, world);
		aroundLivingCount += this.leftUp(x, y, world);
		aroundLivingCount += this.left(x, y, world);
		aroundLivingCount += this.leftDown(x, y, world);
		aroundLivingCount += this.up(x, y, world);
		aroundLivingCount += this.down(x, y, world);
		switch(aroundLivingCount){
			case 0:
			case 1:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
				this.next = false;
				break;
			case 2:
				break;
			case 3:
				this.next = true;
				break;
		}
	}
	draw(ctx: CanvasRenderingContext2D, x: number, y: number){
		this.now = this.next;
		if(this.next){
			ctx.fillStyle = "#000000";
		}
		else{
			ctx.fillStyle = "#ffffff";
		}
		ctx.fillRect(x*Cell.cellSize, y*Cell.cellSize, Cell.cellSize, Cell.cellSize);
	}

}
window.onload=function(){
	var w = new World(100, 100);
	w.timeGoseBy();
}