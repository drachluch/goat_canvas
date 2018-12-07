
var image_urls = [
	"resource/image/chevre_transparente3.png",
	"resource/image/chevre_transparente3_feu.png",
	"resource/image/chevre_transparente3_feu_corne.png",
	"resource/image/chevre_transparente3_feu_petite_corne.png",
	"resource/image/chevre_transparente3_feu_corne2.png",
	"resource/image/chevre_transparente3_feu_grande_corne.png",
	"resource/image/chevre_transparente3_rouge2.png"
	];
var transition_age = [20, 10, 10, 10, 10, 10, 20];
const hit_box_width = 60;
const hit_box_height = 60;

if (image_urls.length != transition_age.length)
	console.log("it does not work this way.");

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
		if (this.age >= 10 && this.state < 6) {
			this.age = 0;
			this.state++;
		}

	}
	
	is_dead() {
		return this.age >= 20;
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
		
		this.audio_agony_s = [];
		this.audio_cooling_s = [];
		
		for (let i = 0; i < 5; i++)
			this.audio_agony_s.push(document.getElementById('audio_agony'+i));
		for (let i = 0; i < 10; i++)
			this.audio_cooling_s.push(document.getElementById('audio_cooling'+i));
		
		this.current_audio_agony = 0;
		this.current_audio_cooling = 0;
		
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
			else {
				if (found_goat.state != 0) {
					this.audio_cooling_s[this.current_audio_cooling].play();
					this.current_audio_cooling = (this.current_audio_cooling + 1) % this.audio_cooling_s.length;
				}
				found_goat.reset();
			}
			
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
		let count = this.goats.length;
		this.goats = this.goats.filter( (goat) => { return !goat.is_dead(); });
		
		if (count != this.goats.length) {
			this.audio_agony_s[this.current_audio_agony].play();
			this.current_audio_agony = (this.current_audio_agony + 1) % this.audio_agony_s.length;
		}
		
		for (let goat of this.goats) {
			goat.get_older();
		}
	}
}


let game = new Game();
game.run();
