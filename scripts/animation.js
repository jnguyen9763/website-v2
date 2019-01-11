var img, numPetals, heightFloor, tolerance, windToler, rotatToler, rotatDiff;
var petals = [];

numPetals = 1;
heightFloor = 10;
tolerance = 5;
windToler = 50;
rotateToler = 15;
rotateDiff = 3;

function setup() {
    angleMode(DEGREES);
    imageMode(CENTER);
    var canvas = createCanvas(document.body.clientWidth, document.body.clientHeight);
    img = loadImage('../images/petal.png');
    for (var i = 0; i < numPetals; i++) {
        petals[i] = new Petal();
    }
}

function draw() {
    background('black');
    for (var i = 0; i < petals.length; i++) {
        if (mouseIsPressed && (mouseX < petals[i].posX + windToler && mouseX > petals[i].posX - windToler)  && (mouseY < petals[i].posY + windToler && mouseY > petals[i].posY - windToler)) {
            if (petals[i].state == "stop") {
                petals[i].state = "fly";
            }
            if (petals[i].state == "fly") {
                petals[i].fly();
            }
        }
        if (petals[i].state == "fall" || !mouseIsPressed) {
            petals[i].fall();
        }
        petals[i].show();
    }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, document.body.clientHeight);
}

function Petal() {
    this.OGrotation = random(360);
    this.rotation = this.OGrotation;
    this.lenX = random(15, 20);
    this.lenY = this.lenX / 2;
    this.posX = random(width);
    this.posY = random(-500, -50);
    this.speedX = random(-2, 2);
    this.speedY = random(1, 2);
    this.state = "fall";
    this.turn_left = random([true, false]);
    this.rotate = true;
    this.change = false;

    // NEED TO REDO THIS
    this.fly = function() {
        //this.speedX = mouseX - this.posX
        //this.speedY = mouseY - this.posY;
        this.speedX = 5;
        this.speedY = 5;
        this.posX -= this.speedX;
        this.posY -= this.speedY;
    }

    this.fall = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;

        if (this.posY > height - heightFloor) {
            this.speedX = 0;
            this.speedY = 0;
            this.rotate = false;
            this.state = "stop";
        }

        if (this.posX < tolerance) {
            this.posX = width - tolerance;
        }
        if (this.posX > width - tolerance) {
            this.posX = tolerance;
        }
    }

    this.show = function() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotation);
        image(img, 0, 0, this.lenX, this.lenY);
        pop();

        if (this.rotate) {
            if (abs(this.OGrotation - this.rotation) < rotateToler || this.change) {
                if (this.change) {
                    if (this.turn) {
                        this.turn = false;
                    }
                    else {
                        this.turn = true;
                    }
                    this.change = false;
                }

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
