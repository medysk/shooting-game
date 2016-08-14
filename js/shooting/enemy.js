SG.Enemy = function( position ) {
	// superクラスのコンストラクタ呼び出し
	SG.GameObj.call( this, { x: position['x'],
							y: position['y'] } );

	this.size = { width: SG.COMMON_ENEMY_WIDTH,
				  height: SG.COMMON_ENEMY_HEIGHT };
	this.firingSpeed = SG.COMMON_ENEMY_BEAM_FIRING_SPEED;
	this.beforeFiringFlame = SG.flameCount;		// 出現フレームを射撃直後とする
	this.moveType;
	this.score = SG.COMMON_ENEMY_SCORE;
	this.constructorName = 'Enemy';
}

// 継承
SG.Enemy.prototype = Object.create( SG.GameObj.prototype );
SG.Enemy.prototype.constructor = SG.GameObj;

// ------ method ------
SG.Enemy.prototype.move = function() {
	this.position.y += 1;
};

SG.Enemy.prototype.graphic = function() {
	var ctx = SG.ctx;
	ctx.beginPath();			// パスをクリア
	ctx.moveTo(  0,  0 );			// 開始位置
	ctx.lineTo( 20,  0 );
	ctx.lineTo( 10, 10 );
	ctx.fillStyle = SG.COMMON_ENEMY_COLOR;		// 塗りつぶしの色
	ctx.fill();
};

SG.Enemy.prototype.deleteProcessing = function(){
	// 画面の外まで移動したら削除する
	if( SG.offScreenCheck( this.position, this.size ) ) this.destructor();
};

SG.Enemy.prototype.action = function() {
	// ----- 親メソッド呼び出し -----
	SG.GameObj.prototype.action.call( this );
	
	// ----- ビーム -----
	if( this.beforeFiringFlame + this.firingSpeed < SG.flameCount ) {
		this.beforeFiringFlame = SG.flameCount;
		SG.instances.EnemyBeam[ SG.GameObj.objID ] = new SG.EnemyBeam( this.position );
	}
};

// getter
SG.Enemy.prototype.getScore = function() { return this.score; };
