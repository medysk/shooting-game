SG.input = [];
SG.cheat = function(e) {
	SG.input.push(e.keyCode);
	
	// コマンドが押されたら
	if( SG.input.toString().indexOf( SG.CHEAT_COMMAND ) >= 0 ) {
		SG.damage = 0;
		for( key in SG.instances.OwnMachine ) {
			SG.instances.OwnMachine[key].setBeamLevel(2);
		}
		SG.input = [];
	}
};
