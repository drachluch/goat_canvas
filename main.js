function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
	
	ctx.fillStyle = "yellow";
	ctx.fillRect(0, 0, 500, 500);
	/*
	ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();
	*/
  }
}

function draw_goat() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var img = new Image();
	img.onload = function() {
		ctx.drawImage(img, 0, 0, 150, 150);
		//ctx.beginPath();
		//ctx.moveTo(30, 96);
		//ctx.lineTo(70, 66);
		//ctx.lineTo(103, 76);
		//ctx.lineTo(170, 15);
		//ctx.stroke();
	};
	img.src = 'chevre_transparente.png';
}

draw();
draw_goat();


