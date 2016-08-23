(function(){
	SG.MIN_X = 0;
	SG.MAX_X = 450;	// canvasのwidthを入れる
	SG.MIN_Y= 0;
	SG.MAX_Y = 600;	// canvasのheightを入れる

	SG.BACKGROUND_COLOR = '#E0FFFF'

	SG.FPS = 1000 / 45;
	SG.CLEAR_FLAME = 5000;

	SG.CHEAT_COMMAND = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft',
											'ArrowRight','ArrowLeft','ArrowRight','b','a'];

	// -----  自機 -----
	SG.OWN_MACHINE_HEIGHT = 10;						// 自機の高さ
	SG.OWN_MACHINE_WIDTH = 20;					// 自機の幅
	SG.OWN_MACHINE_POSITION_X = 225;				// 自機の位置
	SG.OWN_MACHINE_POSITION_Y = 500;
	SG.OWN_MACHINE_SPEED = 5;
	SG.OWN_MACHINE_COLOR = [ '#00F', '#FFD700', '#F00' ];

	// -----  ビーム -----
	SG.BEAM_COLOR = '#ff8c00';
	SG.DEFAULT_BEAM_SPEED = 15
	SG.DEFAULT_BEAM_HEIGHT = 30;;
	SG.DEFAULT_BEAM_WIDTH = 2;
	SG.DEFAULT_BEAM_POWER = 3;
	SG.DEFAULT_BEAM_FIRING_SPEED = 30;

	// ----- 敵機 -----
	SG.COMMON_ENEMY_HEIGHT = 10;
	SG.COMMON_ENEMY_WIDTH = 20;
	SG.COMMON_ENEMY_COLOR = "#F03";
	SG.COMMON_ENEMY_BEAM_COLOR = 'rgba(143, 102, 41, 0.7)';
	SG.COMMON_ENEMY_BEAM_SIZE_HEIGHT = 20;
	SG.COMMON_ENEMY_BEAM_SIZE_WIDTH = 2;
	SG.COMMON_ENEMY_BEAM_SPEED = 4;
	SG.COMMON_ENEMY_BEAM_FIRING_SPEED = 60;	// ビーム発射速度(発射間隔)
	SG.COMMON_ENEMY_SCORE = 1;				// この敵機を倒した場合のスコア
})();
