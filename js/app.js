// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //Math.floor rounds the number downward to the nearest integer
    //
    //The Math.random() function returns a floating-point, pseudo-random number in the range [0, 1) 
    //that is, from 0 (inclusive) up to but not including 1 (exclusive), which you can then scale to 
    //your desired range. The implementation selects the initial seed to the random number generation 
    //algorithm; it cannot be chosen or reset by the user.
    //
    this.speed = 100 + Math.floor(Math.random() * 200);
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // if enemy slides off screen reset to beginning

    if(this.x >= 550) {
        this.x = -50;
    }
// if player gets gets within 50 px of an enemy, reset game

    if (player.x >= this.x - 50 && player.x <= this.x + 50){                          
        if (player.y >= this.y - 50 && player.y <= this.y + 50){            
            player.x = 200;
            player.y = 400;
        }
    }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class,
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.speed = 100 + Math.floor(Math.random() * 200);
};


Player.prototype.update = function(){

// if player is on water, reset player to start position
    if (this.y < 25){
        this.reset();

    }

  this.speed = 100 + Math.floor(Math.random() * 200);
  
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player back to starting position
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
    
};

//Input handler for player
Player.prototype.handleInput = function(e){
//    this.ctlKey = e;
    switch (e){

        case 'up':  
            if (this.y > 0){
                this.y -= 83;
            }
            
        break;

        case 'down':   
            if (this.y < 400){
                this.y += 83;
            }
        break;

        case 'left':  
            if (this.x > 0){
                this.x -= 101;
            }
        break;

        case 'right':  
            
            if (this.x < 402){
                this.x += 101;
            }
        break;            
    }
};


//Instantiate enemies and player objects
var allEnemies =[];

// Place all enemy objects in an array called allEnemies
(function setEnemies(){
    allEnemies.push(new Enemy(-20,60));
    allEnemies.push(new Enemy(-20,150));
    allEnemies.push(new Enemy(-20,220));
}());

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
