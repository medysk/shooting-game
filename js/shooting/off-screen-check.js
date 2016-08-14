// 座標とオブジェクトのサイズを受け取り画面外かどうかを boolean で返す
// 引数はは( 座標: {x: 0,y: 0}, サイズ: {height: 0, width: 0} ) の形で受け取る
SG.offScreenCheck = function( position, size ) {
	if( position['y'] + size['height'] < SG.MIN_Y ) return true;
	if( position['y'] - size['height'] > SG.MAX_Y ) return true;
	if( position['x'] + size['width'] < SG.MIN_X ) return true;
	if( position['x'] - size['width'] > SG.MAX_X ) return true;
	return false;
};