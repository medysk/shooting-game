SG.OwnMachine = function() {
	// superクラスのコンストラクタ呼び出し
	SG.GameObj.call( this, { x: SG.position['x'], y: SG.position['y'] } );
	this.beamLevel = 0;
	this.constructorName = 'OwnMachine';
	this.firingSpeed = SG.DEFAULT_BEAM_FIRING_SPEED;
	this.beforeFiringFlame = 0;
	this.size = { height: SG.OWN_MACHINE_HEIGHT,
				  width: SG.OWN_MACHINE_WIDTH};
		
	this.leftLimitCheck = function() {
		return this.position['x'] > ( SG.MIN_X );
	};
	this.upLimitCheck = function() {
		return this.position['y'] > ( SG.MIN_Y );
	};
	this.rightLimitCheck = function() {
		return this.position['x'] < ( SG.MAX_X - SG.OWN_MACHINE_WIDTH );
	};
	this.downLmitCheck = function() {
		return this.position['y'] < ( SG.MAX_Y - SG.OWN_MACHINE_HEIGHT );
	};
};

// 継承
SG.OwnMachine.prototype = Object.create( SG.GameObj.prototype );
SG.OwnMachine.prototype.constructor = SG.GameObj;

// 自機のグラフィック
SG.OwnMachine.prototype.graphic = function() {
	var ctx = SG.ctx;
	ctx.beginPath();			// パスをクリア
	ctx.moveTo(10, 0);			// 開始位置
	ctx.lineTo(20, 10);
	ctx.lineTo(0, 10);
	ctx.closePath();
	ctx.fillStyle = SG.OWN_MACHINE_COLOR[SG.damage];
	ctx.fill();					// fillは塗りつぶし
//	ctx.strokeStyle = '#5b5';	// strokeは枠
//	ctx.stroke();
};

// 自機の位置座標をセット
SG.OwnMachine.prototype.move = function() {
	// キーが押されている かつ 画面の端かチェック
	if( SG.pressedKey['left']  && this.leftLimitCheck() )
		this.position['x'] -= SG.OWN_MACHINE_SPEED;
		
	if( SG.pressedKey['up']    && this.upLimitCheck() )
		this.position['y'] -= SG.OWN_MACHINE_SPEED;
		
	if( SG.pressedKey['right'] && this.rightLimitCheck() )
		this.position['x'] += SG.OWN_MACHINE_SPEED;
		
	if( SG.pressedKey['down']  && this.downLmitCheck() )
		this.position['y'] += SG.OWN_MACHINE_SPEED;
};

SG.OwnMachine.prototype.action = function() {
	// ----- 親メソッド呼び出し -----
	SG.GameObj.prototype.action.call( this );
	
	// ----- ビーム -----
	var beamLen =  Object.keys( SG.instances.OwnBeam ).length;
	// ボタンが押されている かつ 発射速度(間隔)を経過している
	if( SG.pressedKey['beam'] && (this.beforeFiringFlame + (this.firingSpeed - this.beamLevel * 7) ) <  SG.flameCount ) {
		this.beforeFiringFlame = SG.flameCount;
		var objID = SG.GameObj.objID;
		SG.instances.OwnBeam[objID] = new SG.OwnBeam( this.beamLevel, this.position );
	}
};

SG.OwnMachine.prototype.destructor = function(){
	// 現在位置をグローバル変数に入れる
	SG.position = { x: this.position['x'], y: this.position['y'] };
	delete SG.instances[this.constructorName][this.objID];
};

SG.OwnMachine.prototype.setBeamLevel = function(num) { this.beamLevel = num; };
