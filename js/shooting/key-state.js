SG.keyDown = function(e) {
	if( document.getElementById('key-invalid').checked ) e.preventDefault();
	switch( e.key ) {
		case 'ArrowLeft':
			SG.pressedKey['left']  = true; break;
		case 'ArrowUp':
			SG.pressedKey['up']    = true; break;
		case 'ArrowRight':
			SG.pressedKey['right'] = true; break;
		case 'ArrowDown':
			SG.pressedKey['down']  = true; break;
		case 'z':
			SG.pressedKey['beam']  = true; break;
		case 'x':
			SG.pressedKey['missile'] = true; break;
	}
};

SG.keyUp = function(e) {
	if( document.getElementById('key-invalid').checked ) e.preventDefault();
	switch( e.key ) {
		case 'ArrowLeft':
			SG.pressedKey['left']  = false; break;
		case 'ArrowUp':
			SG.pressedKey['up']    = false; break;
		case 'ArrowRight':
			SG.pressedKey['right'] = false; break;
		case 'ArrowDown':
			SG.pressedKey['down']  = false; break;
		case 'z':
			SG.pressedKey['beam']  = false; break;
		case 'x':
			SG.pressedKey['missile'] = false; break;
	}
};
