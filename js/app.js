// enemies our player must avoid
var Enemy = function(row, speed) {
    this.x = - 101;
    this.y = row * 83 - 20;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// update the enemy's position
// parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // any movement should be multiply by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = - 101;
    }

    checkCollision(this);
};

// draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// our player
var Player = function() {
    this.x = 202;
    this.y = 405;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
// you can live without this method
};

// receive user input
// and move the player according to that input
Player.prototype.handleInput = function(key) {
	switch(key) {
		case 'left':
			if (this.x >= 101) {
                this.x = this.x - 101;
            }
			break;
		case 'right':
			if (this.x < 404) {
                this.x = this.x + 101;
            }
			break;
		case 'up':
			if (this.y >= 73) {
                this.y = this.y - 83;
            }
			break;
		case 'down':
			if (this.y < 405) {
                this.y = this.y + 83;
            }
			break;
	}
    // reset game if the player reaches the water
    if (this.y <= 0) {
        player.reset();
    }
};

 // reset game by moving the player back to the initial location
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
    this.score += 1;
    console.log("score: ", this.score, "\nGood job!");
};

// draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check for collision between enemy and player
var checkCollision = function(enemy) {
    if (
        player.y - enemy.y >= - 60 &&
        player.y - enemy.y <= 60 &&
        player.x - enemy.x >= - 60 &&
        player.x - enemy.x <= 60
    ) {
        player.x = 202;
        player.y = 405;
        player.score = 0;
        console.log("score: ", player.score, "\nOoops");
    }
};

// instantiate our objects
var player = new Player();

var allEnemies = [];

for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy(getRandomNumber(1, 3), getRandomNumber(100, 400)));
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
};

// this listens for key presses and sends the keys
// to Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
