var game = {
	width: 1000,
	height: 500,
	ctx: undefined,
	tile: 100,
	blocks: [],
	sprites: {
		background: undefined,
		objects: undefined,
		character: undefined
	},
	init: function() {
		var cnv = document.getElementById('game');
		this.ctx = cnv.getContext('2d');
		for (var key in this.sprites) {
			this.sprites[key] = new Image();
			this.sprites[key].src = 'img/' + key + '.png';
		}

		window.addEventListener('keydown', function(e) {
			if (e.keyCode == 37) game.character.sx = -game.character.velocity;
			else if (e.keyCode == 39) game.character.sx = game.character.velocity;
		});

		window.addEventListener('keyup', function(e) {
			game.character.stop();
		});
	},
	start: function() {
		this.init();
		this.create();
		this.update();
	},
	create: function() {
		for (var i = 0; i < this.width; i+=this.tile) {
			this.blocks.push({
				x: i,
				y: this.height - this.tile
			});
		}
	},
	render: function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.drawImage(this.sprites.background, 0, 0, 1000, 500);
		this.blocks.forEach(function(element) {
			this.ctx.drawImage(this.sprites.objects, 0, 0, 64, 64, element.x, element.y, this.tile, this.tile);
		}, this);
		this.ctx.drawImage(this.sprites.character, 0, 0, 96, 96, this.character.x, this.character.y, this.tile, this.tile);
	},
	update: function() {
		this.blocks.forEach(function(element) {
			if (this.character.collide(element)) {
				this.character.onGround = true;
			}
		}, this);
		if (!this.character.onGround) this.character.sy = this.character.velocity;
		else this.character.sy = 0;
		this.character.x += this.character.sx;
		this.character.y += this.character.sy;

		this.render();

		window.requestAnimationFrame(function() {
			game.update();
		});
	}
};

game.character = {
	width: 100,
	height: 100,
	x: 100,
	y: 100,
	sx: 0,
	sy: 0,
	velocity: 6,
	onGround: false,
	stop: function() {
		this.sx = 0;
	},
	collide: function(element) {
		if (game.character.y + game.character.height + game.character.sy > element.y) return true;
		return false;
	}
};

window.addEventListener('load', function(){
	game.start();
});