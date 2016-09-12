// namespace
var SG = SG || {};

// global変数
SG.position; 			// 自機位置
SG.score;				// スコア
SG.damage;			// 自機ダメージ
SG.pressedKey = {};		// キーの状態
SG.invincibleFlame;	// 自機無敵状態(flameCount + α)
SG.flameCount;		// ゲーム内フレーム
SG.bgFlameCount;	// ゲームトータルのフレーム(ポーズしている時も含む)
SG.ctx = {};
SG.instances  = { OwnMachine: {}, OwnBeam: {}, Enemy: {}, EnemyBeam: {} };

window.onload = function(){
	var cnvs = document.getElementById('panel');
	var pouse = false;
	var gameTimer;
	var gameDepiction = new SG.GameDepiction();

	SG.position = { x: SG.OWN_MACHINE_POSITION_X, y: SG.OWN_MACHINE_POSITION_Y };
	SG.ctx = cnvs.getContext('2d');

	// event
	window.addEventListener('keydown', SG.keyDown, true);
	window.addEventListener('keyup', SG.keyUp, true);
	window.addEventListener('keyup', SG.cheat, true);
	window.addEventListener('keyup', execute, true);

	gameDepiction.initialize();

	function execute(e) {
		if( e.code !== 'Space' ) return false; // スペースが押されていない場合処理を行わないため
		state = gameDepiction.getCurrentState();
		if( state == 'initialize' || state == 'pause' ) {
			gameTimer = setInterval(run, SG.FPS);
		} else if( state == 'run' ) {
			clearInterval(gameTimer);
			gameDepiction.pause();
		}
	}

	function run() {
		SG.flameCount++;

		gameDepiction.run();
		console.log('test');

 		ownBehavior();
		enemyBehavior();
		// Game Over
		if( SG.damage === 3 ){
			clearInterval(gameTimer);
			gameDepiction.gameover();
		}
		// Game Clear
		if( SG.CLEAR_FLAME < SG.flameCount ) {
			clearInterval(gameTimer);
			gameDepiction.gameclear();
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
};
