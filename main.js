
var image_urls = ["resource/image/chevre_transparente3.png", "resource/image/chevre_transparente3_feu.png"];
const hit_box_width = 60;
const hit_box_height = 60;

class Goat
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.age = 0;
		this.state = 0;
	}
	
	reset()
	{
		this.age = 0;
		this.state = 0;
	}
	
	get_older()
	{
		this.age++;
		if (this.age == 20)
			this.state = 1;

	}
	
	is_dead() {
		return this.age > 50;
	}
	
	is_hit(x, y)
	{
		return Math.abs(x - this.x) <= hit_box_width && Math.abs(y - this.y) <= hit_box_height;
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

		this.goat_images = image_urls.map((str)=>{ let img = new Image(); img.src = str; return img; });

		this.canvas.addEventListener("click", (event)=>{
			let found_goat = null;
			for (let goat of this.goats) {
				if (goat.is_hit(event.offsetX,event.offsetY)) {
					found_goat = goat;
					break;
				}
			}
			
			if (found_goat === null)
				this.goats.push(new Goat(event.offsetX, event.offsetY));
			else
				found_goat.reset();
			
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
		let width = this.goat_images[0].width*this.goat_image_scale;
		let height = this.goat_images[0].height*this.goat_image_scale;
		this.context.drawImage(this.goat_images[goat.state], goat.x - width / 2, goat.y - height / 2, width, height);
	}
	
	draw_all_goats()
	{
		for (let goat of this.goats) {
			this.draw_goat(goat);
		}
	}

	update()
	{
		this.goats = this.goats.filter( (goat) => { return !goat.is_dead(); });
		for (let goat of this.goats) {
			goat.get_older();
		}
	}
}


let game = new Game();
game.run();
