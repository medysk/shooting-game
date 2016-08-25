SG.input_keys = [];
SG.cheat = function(e) {
	if( SG.input_keys.length > SG.CHEAT_COMMAND.length ) SG.input_keys.shift();
	SG.input_keys.push(e.key);
	// コマンドが押されたら
	if( SG.input_keys.toString().indexOf( SG.CHEAT_COMMAND ) >= 0 ) {
		SG.damage = 0;
		for( key in SG.instances.OwnMachine ) {
			SG.instances.OwnMachine[key].setBeamLevel(2);
		}
		SG.input_keys = [];
	}
};
