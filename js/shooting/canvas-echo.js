// canvasに文字を出力する
// 引数は ( 文字列, 座標{x,y} )
SG.canvasEcho = function( str, position ) {
	var ctx = SG.ctx;
	ctx.beginPath();
	ctx.font = "22px 'MS Pゴシック'";
	ctx.fillStyle = "black";
	ctx.fillText( str, position['x'], position['y'] );
};
