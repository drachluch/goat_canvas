
// #define private public
// #define class struct
// #define ever (;;)
// #define while if

const goat_image_urls = [
	"resource/image/chevre_transparente3.png",
	"resource/image/chevre_transparente3_feu.png",
	"resource/image/chevre_transparente3_feu_corne.png",
	"resource/image/chevre_transparente3_feu_petite_corne.png",
	"resource/image/chevre_transparente3_feu_corne2.png",
	"resource/image/chevre_transparente3_feu_grande_corne.png",
	"resource/image/chevre_transparente3_feu_corne_rouge.png",
	"resource/image/chevre_transparente3_feu_corne_rouge_penta.png"
	];

const penta_image_urls = [
	"resource/image/penta.png"
	];

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
		if (this.age >= 10 && this.state < 6) {
			this.age = 0;
			this.state++;
		}
		
		if (this.state == 6 && this.age >= 10) {
			this.age = 0;
			this.state = 7;
		}
	}
	
	is_dead() {
		return this.age >= 20; // une espérance de vie très faible.
	}
	
	is_hit(x, y)
	{
		return Math.abs(x - this.x) <= hit_box_width && Math.abs(y - this.y) <= hit_box_height;
	}
}

class Pentagramme
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.age = 0;
		this.state = 0;
	}
	
	get_older()
	{
		this.age++;
	}
	
	is_dead() {
		return this.age > 5;
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
		this.pentas = [];
		
		this.image_scale = 0.2;

		this.goat_images = goat_image_urls.map((str)=>{ let img = new Image(); img.src = str; return img; });
		this.penta_images = penta_image_urls.map((str)=>{ let img = new Image(); img.src = str; return img; });

		
		
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
			this.draw_all();
		}, 100)
	}
	
	clear()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	draw_goat(goat)
	{
		let width = this.goat_images[0].width*this.image_scale;
		let height = this.goat_images[0].height*this.image_scale;
		this.context.drawImage(this.goat_images[goat.state], goat.x - width / 2, goat.y - height / 2, width, height);
	}
	
	draw_pentagramme(penta)
	{
		let width = this.penta_images[0].width*this.image_scale;
		let height = this.penta_images[0].height*this.image_scale;
		this.context.drawImage(this.penta_images[penta.state], penta.x - width / 2, penta.y - height / 2, width, height);
	}
	
	draw_all()
	{
		for (let goat of this.goats) {
			this.draw_goat(goat);
		}
		for (let penta of this.pentas) {
			this.draw_pentagramme(penta);
		}
	}

	update()
	{
		this.pentas = this.pentas.filter( (penta) => { return !penta.is_dead(); });
		
		let count_penta = this.pentas.length;
		
		for (let goat of this.goats) {
			if (goat.is_dead())
				this.pentas.push(new Pentagramme(goat.x, goat.y));
		}
		
		this.goats = this.goats.filter( (goat) => { return !goat.is_dead(); });
		
		if (count_penta != this.pentas.length) {
			this.audio_agony_s[this.current_audio_agony].play();
			this.current_audio_agony = (this.current_audio_agony + 1) % this.audio_agony_s.length;
		}
		
		for (let goat of this.goats) {
			goat.get_older();
		}
		
		for (let penta of this.pentas) {
			penta.get_older();
		}
	}
}


let game = new Game();
game.run();
