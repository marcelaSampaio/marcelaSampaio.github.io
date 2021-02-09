function calculaDeslocamentoParabola( moduloVelocidade, dt , cosTetha ){
	return Math.round( moduloVelocidade * cosTetha * dt );
}

function calculaAlturaMaxParabola( sinTetha ) {
	//vY = voy + a* dt; onde vY é a componenteY da VelocidadeInicial
	//no topo vY = 0; =>
	//dtTopo = - voy/a =>
	//dtTopo = - (VelocidadeInicial*sinTetha)/ -10 =>

	var dtTopo = ( moduloVelocidade * sinTetha ) / g;
	var alturaMax =  ( moduloVelocidade * sinTetha ) - ( 5 * dtTopo * dtTopo );
	return [ Math.round( alturaMax ) + posYinicial , dtTopo ];
}

function calculaComprimentoIncrementalDoArco( posX , posXo , posY , posYo ){
	var dx = posX - posXo;
	var dy = posY - posYo;
	if( dy < 0 ){
		dy = dy*-1;
	}
	return Math.round(Math.sqrt( dx^2 + dy^2 ));
}

function calculaControlPointBezierCurve (alturaMax , deslocamento ){

	return [posXinicial + (deslocamento*cosTetha) , (alturaMax * sinTetha)* -3 ];	
}

function desenhaCurvaQuadratica ( coordenadasControlPoint , deslocamento , gameContainerDiv , originDiv){
	var larguraDiv = gameContainerDiv.clientWidth;
	var alturaDiv = gameContainerDiv.clientHeight;
	var containerOffset = offset(gameContainerDiv);
	var posGameContainer = [ containerOffset.left , containerOffset.top ];

	var divOffset = offset(originDiv); //origem da parábola
	var posXinicialProjetil = divOffset.left;
	var posYinicialProjetil = alturaDiv - divOffset.top + 50;
	if(deslocamento < 12){
		deslocamento = 12;
	}
	var alcance = deslocamento*10 - 100 * sinTetha + 100*cosTetha;
	//var alcance = posXinicial + deslocamento + (-sinTetha + cosTetha)*10;//erradooo

	var c = document.getElementById( 'myCanvas');
	var ctx = c.getContext('2d');
	ctx.clearRect( 0 , 0 , c.width , c.height );
	ctx.beginPath();
	ctx.moveTo ( posXinicialProjetil, posYinicialProjetil + posGameContainer[1] );
	ctx.quadraticCurveTo(coordenadasControlPoint[0],coordenadasControlPoint[1], alcance  , posYinicialProjetil + posGameContainer[1]);
	ctx.stroke();
	ctx.strokeStyle = '#0000ff';
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}


function calculaAlturaMax() {
		var altura = (moduloVelocidade* moduloVelocidade * sinTetha * sinTetha)/g;
		return altura;
}

function calculaAlcance(){
	if(tetha === 0){
		var alcance = moduloVelocidade;
	}else{
		alcance  = ((moduloVelocidade *moduloVelocidade * Math.sin(2*tetha)/g));
	}
	return alcance;
}

