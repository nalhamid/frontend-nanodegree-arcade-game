/**************  Global Variables *************/

//block size for player movments 
var rowHeight = 83;
var colWidth = 101;

//number of col and rows
var numRows = 6;
var numCols = 5;

//enemy rows for Y location 
var enemiesRows = [60, 145, 230];

//max and min enemy speed
var maxSpeed = 300;
var minSpeed = 50;


/**************  Common Functions *************/

//random integer between max and min
function randomMath(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//restart game function 
function restartGame() {

    //restart player
    player = new Player();

    //erease enemies
    allEnemies = [];

    //add an enemy 
    allEnemies.push(new Enemy());

}
/**************  Enemy Class *************/

// Enemies our player must avoid
var Enemy = function() {

    //picture of the enemy
    this.sprite = 'images/enemy-bug.png';
    //default x postion
    this.x = -colWidth;
    //get random Y postion 
    this.y = enemiesRows[randomMath(enemiesRows.length, 0)];
    //get random speed
    this.speed = randomMath(maxSpeed, minSpeed);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // update X postion for the enemy by multplay dt with the speed
    this.x += dt * this.speed;
    //check if the bug inside the canves (colWidth * num of col ) 
    if (this.x > (colWidth * numCols)) {
        //reset enemy postion and speed
        this.reset();
    }

    //check collision 
    if (this.x >= player.x - 60 && this.x < player.x + 60 && this.y >= player.y && this.y < player.y + 50) {

        //reduce player lives 
        player.lives -= 1;

        //check if there is no more lives to alert user
        if (player.lives === 0) {
            alert('Game Over');
            restartGame();
        } else {
            //alert lost life
            alert('oh you lost a life!');
            //reset player
            player.reset();
        }
    }
};

//reset postion and speed of the enemy 
Enemy.prototype.reset = function() {
    //default x postion
    this.x = -colWidth;
    //get random Y postion 
    this.y = enemiesRows[randomMath(enemiesRows.length, 0)];
    //get random speed
    this.speed = randomMath(maxSpeed, minSpeed);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**************  Player Class *************/
//playyer class
var Player = function() {

    //player current postion 
    this.x = colWidth * 2;
    this.y = (rowHeight * 5) - (rowHeight / 2);

    // set player image
    this.sprite = 'images/char-boy.png';

    // set player life
    this.lives = 3;

    //set game level 
    this.level = 1;
};

Player.prototype.update = function() {
    //check if the player reached the water
    if (this.y <= -(rowHeight / 2)) {
        // reset player postion
        this.reset();

        //increase level 
        this.level += 1;

        //alert user of wining
        alert("level Up!");

        //add an enemy 
        allEnemies.push(new Enemy());
    }
};

//reset player potion 
Player.prototype.reset = function() {
    //reset to the default player postion 
    this.x = colWidth * 2;
    this.y = (rowHeight * 5) - (rowHeight / 2);

};

//Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//move the player based on the pushed keys
Player.prototype.handleInput = function(key) {

    switch (key) {
        case 'up':
            //check top boundry
            if (this.y < -(rowHeight / 2)) {
                return;
            }
            this.y -= rowHeight;
            break;
        case 'down':
            //check bottom boundry
            if (this.y >= (rowHeight * (numRows - 1)) - (rowHeight / 2)) {
                return;
            }
            this.y += rowHeight;
            break;
        case 'left':
            //check left boundry
            if (this.x < (colWidth)) {
                return;
            }
            this.x -= colWidth;
            break;
        case 'right':
            //check bottom boundry
            if (this.x >= ((colWidth * (numCols - 1)))) {
                return;
            }
            this.x += colWidth;
            break;
    }
};


// Place the player object in a variable called player

/**************  instantiate objects *************/

//an array of all enemies
var allEnemies = [];

//add an enemy 
allEnemies.push(new Enemy());

//player object
var player = new Player();

/************** Event Listener *************/

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
