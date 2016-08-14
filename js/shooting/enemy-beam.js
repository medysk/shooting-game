SG.EnemyBeam = function( baseUnitPosition ) {
	this.baseUnitPosition = { x: baseUnitPosition['x'],
								y: baseUnitPosition['y'] };
	this.size = { width: SG.COMMON_ENEMY_BEAM_SIZE_WIDTH,
				  height: SG.COMMON_ENEMY_BEAM_SIZE_HEIGHT };

	// 自機の先端座標からビームサイズの半分ずらした位置の座標をセット
	// superクラスのコンストラクタ呼び出し
	var tempWidth = this.baseUnitPosition['x'] + SG.OWN_MACHINE_WIDTH / 2;
	SG.GameObj.call( this, { x: tempWidth - this.size['width'] / 2,
							y: this.baseUnitPosition['y'] } );
					 
	this.speed = SG.COMMON_ENEMY_BEAM_SPEED;
	this.constructorName = 'EnemyBeam';
}

// 継承
SG.EnemyBeam.prototype = Object.create( SG.GameObj.prototype );
SG.EnemyBeam.prototype.constructor = SG.GameObj;

SG.EnemyBeam.prototype.move = function() {
	this.position['y'] += this.speed;
};

// 画面外に出た場合と自機に当たった場合削除(自機も)し、自機ダメージを++
SG.EnemyBeam.prototype.deleteProcessing = function(){
	if( SG.offScreenCheck( this.position, this.size ) ) this.destructor();
	
	var targetName = 'OwnMachine';
	var result = SG.collisionDetection( this.size, this.position, targetName );
	// 弾に当たった かつ 無敵状態ではない
	if( result !== false && (SG.invincibleFlame < SG.flameCount) ) {
		this.destructor();
		SG.damage++;
		SG.instances[targetName][result].destructor();
	}
};

SG.EnemyBeam.prototype.graphic = function() {
	var ctx = SG.ctx;
	ctx.beginPath();			// パスをクリア
	ctx.fillStyle = SG.COMMON_ENEMY_BEAM_COLOR;
	var sizeHeight;
	// ビームの発射地点 + ビームサイズ が自機に重なる場合はビームサイズを小さくする
	if( (this.position['y'] + this.size['height']) < this.baseUnitPosition['y'] ) {
		 sizeHeight = this.position['y'] - this.baseUnitPosition['y'];
	}
 	ctx.fillRect( 0, 
 				  0,
 				  this.size['width'],
 				  sizeHeight || this.size['height'] );
	ctx.fill();
};

