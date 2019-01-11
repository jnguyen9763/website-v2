var img, numPetals, heightFloor, tolerance, windToler, rotatToler, rotatDiff, stdDist;
var petals = [];

numPetals = 1;
heightFloor = 10;
tolerance = 5;
windToler = 50;
rotateToler = 15;
rotateDiff = 3;
stdDist = 50;

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
        if (petals[i].state != "fall" && mouseIsPressed && (mouseX < petals[i].posX + windToler && mouseX > petals[i].posX - windToler)  && (mouseY < petals[i].posY + windToler && mouseY > petals[i].posY - windToler)) {
            petals[i].computeSpeed();
            if (petals[i].state == "stop") {
                petals[i].state = "fly";
            }
        }
        if (petals[i].state == "fall") {
            petals[i].fall();
        }
        if (petals[i].state == "fly") {
            petals[i].fly();
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

    this.computeSpeed = function() {
        var distance = abs(dist(mouseX, mouseY, this.posX, this.posY));
        var factor = (stdDist - distance) / distance;
        this.speedX = (abs(mouseX - this.posX) * factor) / stdDist;
        this.speedY = (abs(mouseY - this.posY) * factor) / stdDist;

        if (mouseX < this.posX) {
            this.speedX *= -1;
        }
        if (mouseY < this.posY) {
            if (this.posY > height - heightFloor) {
                this.speedY = 0;
            }
            else {
                this.speedY *= -1;
            }
        }
    }

    this.fly = function() {
        this.rotate = true;
        this.posX -= this.speedX;
        this.posY -= this.speedY;

        if (this.posX < tolerance) {
            this.posX = width - tolerance;
        }
        if (this.posX > width - tolerance) {
            this.posX = tolerance;
        }
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
