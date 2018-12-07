
class Goat
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.age = 0;
	}
	
	get_older()
	{
		this.age++;
	}
}

class Game
{
	constructor()
	{
		this.canvas = document.getElementById('canvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = canvas.getContext('2d');
		this.goats = [];
		this.goat_image_scale = 0.2;

		this.goat_image = new Image();
		this.goat_image.src = "resource/image/chevre_transparente3.png";
		
		this.burning_goat_image = new Image();
		this.burning_goat_image.src = "resource/image/chevre_transparente3_feu.png";

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
		let width = this.goat_image.width*this.goat_image_scale;
		let height = this.goat_image.height*this.goat_image_scale;
		this.context.drawImage((goat.age < 10 ? this.goat_image : this.burning_goat_image), goat.x - width / 2, goat.y - height / 2, width, height);
	}
	
	draw_all_goats()
	{
		for (let goat of this.goats) {
			
			this.draw_goat(goat);
		}
	}

	update()
	{
		for (let goat of this.goats) {
			goat.get_older();
		}
		
	}
}


let game = new Game();
game.run();
