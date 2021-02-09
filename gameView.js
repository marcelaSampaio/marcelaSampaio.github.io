var tetha = 0;
var sinTetha;
var cosTetha;
var disparo = false;
var posYinicial = 30;
var posXinicial = 35;
var dt = 0;
var moduloVelocidade = 12;
var widthCointainer = 450;
var heightContainer = 250;
var g = 10;

function updateGameArea() {
   // myGameArea.clear();
   
   	sinTetha = Math.sin(tetha);
   	cosTetha = Math.cos(tetha); 
  	catetoOp = 20 * Math.sin(tetha); //33 é o comprimento do canhão aproximado
   	catetoAdj = 33 * Math.cos(tetha);

   	document.getElementById('gun').style.transform = 'matrix('
   		+cosTetha+','+sinTetha*-1+','
   		+sinTetha+','+cosTetha+','
   		+ 0 +     ','+ 0 +')'; //matriz de Transformação Linear 2D [rotação anti-horária].

   	var alturaMax = calculaAlturaMax();
   	//var dtTopo = calculaAlturaMaxParabola(sinTetha)[1];
   	var alcance = calculaAlcance();

   	if (alcance * moduloVelocidade > widthCointainer/moduloVelocidade - posXinicial){
   		document.getElementById('gameContainer').style.width = widthCointainer + alcance * moduloVelocidade 
   		+ posXinicial + moduloVelocidade*sinTetha*30;
   	}
   	if(alturaMax + posYinicial > heightContainer/moduloVelocidade - posYinicial){
   		document.getElementById('gameContainer').style.height = heightContainer + alturaMax *
   		 moduloVelocidade + 50;
   	}

   	var coordenadasCTP = calculaControlPointBezierCurve(alturaMax + posYinicial, alcance + posXinicial);

	 desenhaCurvaQuadratica( coordenadasCTP , alcance ,
   document.getElementById('gameContainer')        , 
   document.querySelector('#completeTank')         );
 
    if (myGameArea.key && myGameArea.key === 38 && disparo === false) {
    	if(tetha < 1.56){ //1.57 é a aproximação de 1/2*pi [radianos] (90graus).
    		tetha = tetha + 0.05; 
    	}
    }
    if (myGameArea.key && myGameArea.key === 40 && disparo === false) {
    	if (tetha > 0){
    		tetha = tetha - 0.05;
    	}
    }
    if(myGameArea.key && myGameArea.key === 32 && disparo ===false){
    	document.getElementById('circle').style.bottom = posYinicial +'px';
    	document.getElementById('circle').style.left = posXinicial + 'px';
    	posY = posYinicial - catetoOp ;
    	posX = posXinicial + catetoAdj;
    	var comprimentoDoArco = 0;
    	animateBall(sinTetha , cosTetha, comprimentoDoArco);
    }
}

function animateBall(sinTetha , cosTetha, comprimentoDoArco) {
	disparo = true;
	var id = setInterval(frame, 50);

	function frame(){
		var posXo;
		var posYo;
		//var escalaX;
		//var escalaY;
		if(comprimentoDoArco > 5 ){//5 é o comprimento estimado do canhão;
			document.getElementById('circle').style.display = 'block';//a trajetória do circulo se inicia antes de sair do canhão.
			//porém, o circulo só é mostrado uma vez fora do canhão;
		}
   		if(disparo){
   		posXo = posX; //posição (x,y) inicial
   		posYo = posY; 
			posX = posX + moduloVelocidade * cosTetha * dt; //As equações não possuem posição inicial porque o objeto é translacionado.
			posY = posY + (moduloVelocidade * sinTetha) - (g/2 * dt * dt);//considera-se somente a trajetória do projétil.
			dt = dt + 0.030; 

			//A precisão do comprimento de arco depende do módulo do incremento em dt. 
			//para maior precisão o incremento deve ser infinitesimal. 
			//Quanto maior precisão maior o tamanho do arco (mais próximo do tamanho real).
			comprimentoDoArco = comprimentoDoArco + calculaComprimentoIncrementalDoArco(posX , posXo , posY , posYo);
			//Matriz de Transformação Linear [translação] para animação do projétil;
			document.getElementById('circle').style.transform = 'matrix('
   				+ 1 +   ','    + 0 +    ','
   				+ 0 +   ','    + 1 +    ','
   				+ posX +','+ posY * -1 +')'; 
   			//if(posX > 400){
   			//	var delta = posX - posXo;
   			//	widthCointainer = widthCointainer + delta;
   			//	document.getElementById('gameContainer').style.width = widthCointainer;
   			//}
   			//if(posY > 200){
   			//	var delta = posY - posYo;
   			//	if(delta > 0){heightContainer = heightContainer + delta;}
   			//	document.getElementById('gameContainer').style.height = heightContainer;
   			//}
			//document.getElementById('gameContainer').style.transform = 'matrix('
   			//	+ escalaX +   ','    + 0 +         ','
   			//	+ 0 +         ','    + escalaY +   ','
   			//	+ 0 +         ','    + 0 +         ')';
				//Matriz de Transformação Linear [redimensionamento] para ajustar o tamanho da área de acordo com a 
				//trajetória da parábola.
		}
		if(posY < -10 ){
			var deslocamento = calculaDeslocamentoParabola( moduloVelocidade, dt , cosTetha );
			var alturaMax = calculaAlturaMaxParabola( sinTetha );
			
			document.getElementById( 'texto' ).innerHTML = 'A altura máxima foi: '+ alturaMax[0] +' m'+
			'<br>A deslocamento foi: '+ deslocamento +' m'+
			'<br>A distância percorrida foi: '+ comprimentoDoArco + ' m';
			
			clearInterval(id);
		}
	}
}

