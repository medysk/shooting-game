SG.GameObj = function(position) {
	this.objID = SG.GameObj.objID++;
	this.position = { x: position['x'],
					  y: position['y'] };
	this.constructorName = 'SG.GameObj';
	this.size;
};

// static変数
SG.GameObj.objID = 0;

// method
SG.GameObj.prototype.graphic = function(){};

// canvasに描く
SG.GameObj.prototype.draw = function(){
	var ctx = SG.ctx;
	ctx.save();
	ctx.translate( this.position['x'], this.position['y'] );
	this.graphic();
	ctx.restore();
};

SG.GameObj.prototype.move = function(){};

SG.GameObj.prototype.action = function(){
	this.move();
	this.draw();
	this.deleteProcessing();
};

SG.GameObj.prototype.deleteProcessing = function(){};

SG.GameObj.prototype.destructor = function(){
	delete SG.instances[this.constructorName][this.objID];
};

// setter, getter
SG.GameObj.prototype.getObjID    = function() { return this.objID; };
SG.GameObj.prototype.getPosition = function() { return this.position; };
SG.GameObj.prototype.getSize     = function() { return this.size; };
SG.GameObj.prototype.getConstructorName = function() { return this.getConstructorName; };
