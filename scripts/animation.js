//NOTE: commented out code is for another animation, where user can drag around petals and release them after, disabled for now

var img, numPetals, heightFloor, tolerance, mouseToler, rotatToler, rotatDiff;
var petals = []; // Holds Petal objects
var fell = []; // Keeps track of each petal object's location

numPetals = 50;
heightFloor = 10;
tolerance = 5;
//mouseToler = 10;
rotateToler = 15;
rotateDiff = 3;

function setup() {
    angleMode(DEGREES);
    imageMode(CENTER);
    var canvas = createCanvas(document.body.clientWidth, document.body.clientHeight);
    img = loadImage('../images/petal.png');
    // Prepare all petals and sets each 'fell' state to false
    for (var i = 0; i < numPetals; i++) {
        petals[i] = new Petal();
        fell[i] = false;
    }
}

function draw() {
    background('black');
    for (var i = 0; i < petals.length; i++) {
        // If petals hit edge of the screen, will continue onto other edge
        if (petals[i].posX < tolerance) {
            petals[i].posX = width - tolerance;
        }
        if (petals[i].posX > width - tolerance) {
            petals[i].posX = tolerance;
        }
        // If petals fall out of screen, 'fell' state is now true
        if (petals[i].posY > height) {
            fell[i] = true;
        }
        /*
        if (petals[i].posY > height - heightFloor) {
                petals[i].speedX = 0;
                petals[i].speedY = 0;
                petals[i].rotate = false;
        }
        */
        petals[i].fall();
        petals[i].show();
    }
    // If all petals are out of screen, stop animation and remove the canvas
    if (fell.every(function(val) { return val == true; })) {
        remove();
    }
}
/*
function mousePressed() {
    for (var i = 0; i < petals.length; i++) {
        if ((mouseX < petals[i].posX + mouseToler && mouseX > petals[i].posX - mouseToler)  && (mouseY < petals[i].posY + mouseToler && mouseY > petals[i].posY - mouseToler)) {
            petals[i].follow = true;
        }
    }
}

function mouseReleased() {
    for (var i = 0; i < petals.length; i++) {
        if (petals[i].follow == true) {
            petals[i].follow = false;
            petals[i].computeSpeed();
        }
    }
}

function mouseDragged() {
    for (var i = 0; i < petals.length; i++) {
        if ((mouseX < petals[i].posX + mouseToler && mouseX > petals[i].posX - mouseToler)  && (mouseY < petals[i].posY + mouseToler && mouseY > petals[i].posY - mouseToler)) {
            petals[i].follow = true;
        }
        if (petals[i].follow == true) {
            petals[i].followMouse();
        }
    }
}
*/
function windowResized() {
  resizeCanvas(document.body.clientWidth, document.body.clientHeight);
}

function Petal() {
    // rotation
    this.OGrotation = random(360);
    this.rotation = this.OGrotation;
    // size of petal image (1:2 width length ratio)
    this.lenX = random(15, 20);
    this.lenY = this.lenX / 2;
    // position of petal (off screen initially)
    this.posX = random(width);
    this.posY = random(-500, -50);
    // speed of petals (direction of petal)
    this.speedX = random(-2, 2);
    this.speedY = random(1, 2);
    // rotation of petals side to side
    this.turn = random([true, false]);
    this.rotate = true;
    this.change = false;
    //this.follow = false;
    /*
    this.computeSpeed = function() {
        this.speedX = random(-0.5, 0.5);
        this.speedY = random(0.5, 1);
    }

    this.followMouse = function() {
        this.rotate = true;
        this.speedX = 0;
        this.speedY = 0;
        this.posX = mouseX;
        this.posY = mouseY;
    }
    */
    this.fall = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }

    this.show = function() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotation);
        image(img, 0, 0, this.lenX, this.lenY);
        pop();
        // rotate petals side to side
        if (this.rotate) {
            if (abs(this.OGrotation - this.rotation) < rotateToler || this.change) {
                // if petal needs to change direction (left or right)
                if (this.change) {
                    if (this.turn) {
                        this.turn = false;
                    }
                    else {
                        this.turn = true;
                    }
                    this.change = false;
                }
                // petal rotates (same direction)
                if (this.turn) {
                    this.rotation += random(0, rotateDiff);
                }
                else {
                    this.rotation -= random(0, rotateDiff);
                }
            }
            else {
                this.change = true;
            }
        }
    }
}
