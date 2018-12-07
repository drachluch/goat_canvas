
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resizeCanvas();

function draw_goat(ctx, img, center, howbig) {
	let width = img.width * howbig;
	let height = img.height * howbig;
	ctx.drawImage(img, center.x - width / 2, center.y - height / 2, width, height);
}

function draw_goats(ctx, img, direction, reduction, count_goats, origine, first_size) {
	let point = {x: origine.x, y: origine.y};
	let size = first_size;
	
	for (var i = 0; i < count_goats; i++) {
		draw_goat(ctx, img, point, size);
		point = {x: point.x + direction.x, y: point.y + direction.y};
		size = size * reduction;
	}
}

var img = new Image();
img.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	var direction = {x: 0, y: 0};
	var reduction = .75;
	var count_goats = 16;
	var origine = {x: canvas.width / 2, y: canvas.height / 2};
	var first_size = 5;
	
	draw_goats(ctx, img, direction, reduction, count_goats, origine, first_size);
	
	canvas.onclick = function(e) {
		let x = e.clientX - canvas.width / 2;
		let y = e.clientY - canvas.height / 2;
		let direction = {x: x/ count_goats, y: y/count_goats};
		
		draw_goats(ctx, img, direction, reduction, count_goats, origine, first_size);
	};
	
}
img.src = "../resource/image/chevre_transparente3.png";
