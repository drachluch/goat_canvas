
function draw_goat(ctx, img, center, howbig) {
	let width = img.width * howbig;
	let height = img.height * howbig;
	ctx.drawImage(img, center.x - width / 2, center.y - height / 2, width, height);
}

function draw_goats(ctx, img, direction, reduction, norme, count_goats, origine, first_size) {
	let point = {x: origine.x, y: origine.y};
	let size = first_size;
	
	for (var i = 0; i < count_goats; i++) {
		draw_goat(ctx, img, point, size);
		point = {x: point.x + direction.x * norme, y: point.y + direction.y * norme};
		size = size * reduction;
	}
}

var img = new Image();
img.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ctx.fillStyle = "yellow";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var direction = {x: 0, y: 0};
	var reduction = .75;
	var norme = 20;
	var count_goats = 16;
	var origine = {x: canvas.width / 2, y: canvas.width / 2};
	var first_size = 5;
	
	draw_goats(ctx, img, direction, reduction, norme, count_goats, origine, first_size);
	
	canvas.onclick = function(e) {
		console.log(e);
		let x = e.clientX - canvas.width / 2;
		let y = e.clientY - canvas.height / 2;
		let norme = Math.sqrt(x * x + y * y);
		let direction = {x: x/norme, y: y/norme};
		
		draw_goats(ctx, img, direction, reduction, norme, count_goats, origine, first_size);
	};
	
}
img.src = "resource/image/chevre_transparente3.png";








