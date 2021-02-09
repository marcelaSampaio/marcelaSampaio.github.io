function startGame() {
	myGameArea.start();
	document.getElementById('gun').style.transformOrigin = 'top left';
}

var myGameArea = {

	canvas : document.createElement("background"),
    start : function() {
    	this.interval = setInterval(updateGameArea, 30);
    	window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
       // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

