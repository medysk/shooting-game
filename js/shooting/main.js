// namespace
var SG = SG || {};

// global変数
SG.position; 			// 自機位置
SG.score = 0;				// スコア
SG.damage = 0;			// 自機ダメージ
SG.pressedKey = {};		// キーの状態
SG.invincibleFlame = 0;	// 自機無敵状態(flameCount + α)
SG.flameCount = 0;		// ゲーム内フレーム
SG.bgFlameCount = 0;	// ゲームトータルのフレーム(ポーズしている時も含む)
SG.ctx = {};
SG.instances  = { OwnMachine: {}, OwnBeam: {}, Enemy: {}, EnemyBeam: {} };

window.onload = function(){
	var cnvs = document.getElementById('panel');
	var pouse = false;
	var gameTimer;
	var standbyTimer;
	var beforeToggleFlame = 0;
	var pouse = true;
	SG.position = { x: SG.OWN_MACHINE_POSITION_X, y: SG.OWN_MACHINE_POSITION_Y };
	SG.ctx = cnvs.getContext('2d');

	// event
	window.addEventListener('keydown', SG.keyDown, true);
	window.addEventListener('keyup', SG.keyUp, true);
	window.addEventListener('keyup', SG.cheat, true);

	// 背景
	SG.ctx.fillStyle =	SG.BACKGROUND_COLOR;
	SG.ctx.fillRect(SG.MIN_X, SG.MIN_X, SG.MAX_X, SG.MAX_Y);

	standbyTimer = setInterval( standby, SG.FPS );
	SG.canvasEcho('スペースキーで始まります', {x:100, y:250} );

	function execute() {
 		gameBehavior();
 		ownBehavior();
		enemyBehavior();
	}

	function gameBehavior() {
 		SG.flameCount++;
		SG.bgFlameCount++;
		// canvasクリア
		SG.ctx.clearRect(SG.MIN_X, SG.MIN_X, SG.MAX_X, SG.MAX_Y);
		// 背景
		SG.ctx.fillStyle =	SG.BACKGROUND_COLOR;
		SG.ctx.fillRect(SG.MIN_X, SG.MIN_X, SG.MAX_X, SG.MAX_Y);
		
		SG.canvasEcho('score: ' + SG.score , {x:10, y:20} );
		// スペースが押された かつ 前回一時停止してから12フレーム後(一時停止処理が連続で行われるため)の場合、一時停止
		if( SG.pressedKey['pause'] && (beforeToggleFlame < SG.bgFlameCount - 12) ) {
			toggleGame();
		}

		// Game Over
		if( SG.damage === 3 ){
			clearInterval(gameTimer);
			SG.canvasEcho('Game Over', {x:180, y:300} );
		}

		// Game Clear
		if( SG.CLEAR_FLAME < SG.flameCount ) {
			clearInterval(gameTimer);
			SG.canvasEcho('Game Clear', {x:180, y:300} );
		}
	}

	function ownBehavior() {
		// 自機が未出現 か 自機削除 かつ ダメージが3未満 なら 自機作成 + 一時無敵状態
 		if( Object.keys(SG.instances.OwnMachine).length === 0 && (SG.damage < 3) ) {
 			SG.instances.OwnMachine[SG.GameObj.objID] = new SG.OwnMachine();
 			SG.invincibleFlame = SG.flameCount + 30; 	// 30フレーム無敵
 		}
 		for( key in SG.instances.OwnMachine ) {
			SG.instances.OwnMachine[key].action();
		}
		// 自ビームが存在していれば動かす
		for( key in SG.instances.OwnBeam ) {
			SG.instances.OwnBeam[key].action();
		}
	}

	function enemyBehavior() {
		// 敵機の出現位置(x座標)
		var max = SG.MAX_X - SG.COMMON_ENEMY_WIDTH - SG.MIN_X;
		var positionX = Math.floor( Math.random() * max ) + SG.MIN_X;
		if( SG.flameCount % 100 === 0 ){
			var objID = SG.GameObj.objID;
			SG.instances.Enemy[objID] = new SG.Enemy( {x: positionX, y: 0} );
		}
		// 敵機が存在していれば動かす
		for( key in SG.instances.Enemy ) {
			SG.instances.Enemy[key].action();
		}
		// 敵ビームが存在していれば動かす
		for( key in SG.instances.EnemyBeam ) {
			SG.instances.EnemyBeam[key].action();
		}

	}

	function standby() {
		SG.bgFlameCount++;
		// スペースが押された かつ 前回一時停止してから12フレーム後(一時停止処理が連続で行われるため)
		if( SG.pressedKey['pause'] && (beforeToggleFlame < SG.bgFlameCount - 12) ) {
			SG.pressedKey['pause'] = false;	// keystate側でfalseにならないことがあったので
			toggleGame();
		}
	}

	function toggleGame() {
		beforeToggleFlame = SG.bgFlameCount;
		if(pouse) {
			pouse = false;
			clearInterval(standbyTimer);
			gameTimer = setInterval( execute, SG.FPS );
		} else {
			pouse = true;
			clearInterval(gameTimer);
			standbyTimer = setInterval( standby, SG.FPS );
		}
	}
};
