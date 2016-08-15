SG.GameDepiction = function() {
  this.currentState = '';
  this.background = function(){
    // 背景
    SG.ctx.fillStyle =	SG.BACKGROUND_COLOR;
    SG.ctx.fillRect(SG.MIN_X, SG.MIN_X, SG.MAX_X, SG.MAX_Y);
  };
};

SG.GameDepiction.prototype.initialize = function () {
  this.currentState = 'initialize';
  SG.flameCount = 0;
  SG.bgFlameCount = 0;
  SG.score = 0;
  SG.damage = 0;
  SG.invincibleFlame = 0;	
  SG.position = { x: SG.OWN_MACHINE_POSITION_X, y: SG.OWN_MACHINE_POSITION_Y };

  this.background();
  SG.canvasEcho('スペースキーで始まります', {x:100, y:250} );
};

SG.GameDepiction.prototype.run = function () {
  this.currentState = 'run';

  SG.ctx.clearRect(SG.MIN_X, SG.MIN_X, SG.MAX_X, SG.MAX_Y); // canvasクリア
  this.background();
  SG.canvasEcho('score: ' + SG.score , {x:10, y:20} );      // score

};

SG.GameDepiction.prototype.pause = function () {
  this.currentState = 'pause';
  SG.canvasEcho('pause', {x:200, y:300} );
};

SG.GameDepiction.prototype.gameover = function () {
  this.currentState = 'gameover';
  SG.canvasEcho('Game Over', {x:180, y:300} );
};

SG.GameDepiction.prototype.gameclear = function () {
  this.currentState = 'gameclear';
  SG.canvasEcho('Game Clear', {x:180, y:300} );
};

SG.GameDepiction.prototype.getCurrentState = function () { return this.currentState };
