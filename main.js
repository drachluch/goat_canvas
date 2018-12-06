
class Goat
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}


class Game
{
	constructor()
	{
		this.canvas = document.getElementById('canvas');
		this.context = canvas.getContext('2d');
		this.goats = [];
		this.goat_image_scale = 0.2;

		this.goat_image = new Image();
		this.goat_image.src = "chevre_transparente3.png";

		this.canvas.addEventListener("click", (event)=>{
			this.goats.push(new Goat(event.offsetX, event.offsetY));
		});
	}

	run()
	{
		setInterval(()=>{
			this.update();
			this.clear();
			this.draw_all_goats();
		}, 100)
	}
	
	clear()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	draw_goat(goat)
	{
		this.context.drawImage(this.goat_image, goat.x, goat.y, this.goat_image.width*this.goat_image_scale, this.goat_image.height*this.goat_image_scale);
	}
	
	draw_all_goats()
	{
		for (let goat of this.goats) {
			this.draw_goat(goat);
		}
	}

	update()
	{

	}
}


let game = new Game();
game.run();
