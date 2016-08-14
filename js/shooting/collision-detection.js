// 判定したい自身の座標({x, y})とサイズ
// さらに対象のconstructorName(ゲームオブジェクトのプロパティ)と受け取り
// 受け取った座標と対象のオブジェクトと座標が衝突しているか判定する(対象は0..N)

// 衝突が起こった場合は対象のオブジェクトの objID を返す
// 衝突が起こらなかった場合は false を返す

SG.collisionDetection = function( size, position, constructorName ) {
	// 対象のオブジェクトが一つも存在していなかった場合 false を返す
	if( Object.keys( SG.instances[ constructorName ] ).length == 0) return false;
	var instances = SG.instances[ constructorName ];
	
	// TODO: 可読性が低く処理も遅そうなので、要リファクタリング
	
	for( key in instances ) {
		var targetSize = instances[key].getSize();
		var minTargetPosition =  instances[key].getPosition();
		var maxTargetPosition = { x: minTargetPosition['x'] + targetSize['width'],
								  y: minTargetPosition['y'] + targetSize['height'] };
		var minPosition = position;
		var maxPosition = { x: position['x'] + size['width'],
							y: position['y'] + size['height'] };
		var xFlag = false;
		
		if( minPosition['x'] < maxTargetPosition['x'] &&
			maxPosition['x'] > minTargetPosition['x'] &&
			minPosition['y'] < maxTargetPosition['y'] &&
			maxPosition['y'] > minTargetPosition['y']) return key;
	}
	return false;
};