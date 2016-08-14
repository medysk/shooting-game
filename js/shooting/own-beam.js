SG.OwnBeam = function( level, baseUnitPosition ) {
	this.ability = [ 
		{ speed: 0, size: { width: 0, height: 0 }, power: 0 },
		{ speed: 3, size: { width: 2, height: 6 }, power: 1 },
		{ speed: 6, size: { width: 4, height: 12 }, power: 2 }
	];
	this.baseUnitPosition = { x: baseUnitPosition['x'],
								y: baseUnitPosition['y'] };
	this.size = { width: SG.DEFAULT_BEAM_WIDTH  + this.ability[level]['size']['width'],
				  height: SG.DEFAULT_BEAM_HEIGHT + this.ability[level]['size']['height'] };

	// 自機の先端座標からビームサイズの半分ずらした位置の座標をセット
	// superクラスのコンストラクタ呼び出し
	var tempX = this.baseUnitPosition['x'] + SG.OWN_MACHINE_WIDTH / 2;
	SG.GameObj.call( this, { x: tempX - this.size['width'] / 2,
							 y: this.baseUnitPosition['y'] } );
					 
	this.speed = SG.DEFAULT_BEAM_SPEED + this.ability[level]['speed'];
	this.power = SG.DEFAULT_POWER + this.ability[level]['power'];
	this.constructorName = 'OwnBeam';
}

// 継承
SG.OwnBeam.prototype = Object.create( SG.GameObj.prototype );
SG.OwnBeam.prototype.constructor = SG.GameObj;

SG.OwnBeam.prototype.move = function() {
	this.position['y'] -= this.speed;
};

// 画面外に出た場合と敵機に当たった場合(敵機も)削除
SG.OwnBeam.prototype.deleteProcessing = function(){
	if( SG.offScreenCheck( this.position, this.size ) ) this.destructor();
	var targetName = 'Enemy';
	var result = SG.collisionDetection( this.size, this.position, targetName )
	if( result !== false ) {
		this.destructor();
		SG.score += SG.instances[targetName][result].getScore(); // score加算
		SG.instances[targetName][result].destructor();
	}
};

SG.OwnBeam.prototype.graphic = function() {
	var ctx = SG.ctx;
	ctx.beginPath();			// パスをクリア
	ctx.fillStyle = SG.BEAM_COLOR;
	var sizeY;
	// ビームの発射地点 + ビームサイズ が自機に重なる場合はビームサイズを小さくする
	if( (this.position['y'] + this.size['height']) > this.baseUnitPosition['y'] ) {
		 sizeY = this.baseUnitPosition['y'] - this.position['y'];
	}
 	ctx.fillRect( 0, 
 				  0,
 				  this.size['width'],
 				  sizeY || this.size['height'] );
	ctx.fill();
};
