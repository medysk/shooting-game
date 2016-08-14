SG.keyDown = function(e) {
	if( document.getElementById('key-invalid').checked ) e.preventDefault();
	switch( e.keyCode ) {
		case SG.LEFT_KEY_CODE: 
			SG.pressedKey['left']  = true; break;
		case SG.UP_KEY_CODE: 
			SG.pressedKey['up']    = true; break;
		case SG.RIGHT_KEY_CODE:
			SG.pressedKey['right'] = true; break;
		case SG.DOWN_KEY_CODE:
			SG.pressedKey['down']  = true; break;
		case SG.Z_KEY_CODE:
			SG.pressedKey['beam']  = true; break;
		case SG.X_KEY_CODE:
			SG.pressedKey['missile'] = true; break;
		case SG.SPACE_KEY_CODE:
			SG.pressedKey['pause'] = true; break;
	}
};

SG.keyUp = function(e) {
	if( document.getElementById('key-invalid').checked ) e.preventDefault();
	switch( e.keyCode ) {
		case SG.LEFT_KEY_CODE: 
			SG.pressedKey['left']  = false; break;
		case SG.UP_KEY_CODE: 
			SG.pressedKey['up']    = false; break;
		case SG.RIGHT_KEY_CODE:
			SG.pressedKey['right'] = false; break;
		case SG.DOWN_KEY_CODE:
			SG.pressedKey['down']  = false; break;
		case SG.Z_KEY_CODE:
			SG.pressedKey['beam']  = false; break;
		case SG.X_KEY_CODE:
			SG.pressedKey['missile'] = false; break;
		case SG.SPACE_KEY_CODE:
			SG.pressedKey['pause'] = false; break;
	}
};


