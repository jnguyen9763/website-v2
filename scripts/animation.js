var img, numPetals, heightFloor;
var petals = [];

numPetals = 50;
heightFloor = 10;

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
        if (petals[i].falling == true) {
            petals[i].fall();
            petals[i].show();
        }
        else {
            petals[i].jump();
            petals[i].show();
        }
    }
}

function mouseClicked() {
    for (var i = 0; i < petals.length; i++) {
        if ((mouseX < petals[i].posX + 5 && mouseX > petals[i].posX - 5)  && (mouseY < petals[i].posY + 5 && mouseY > petals[i].posY - 5)) {
            petals[i].falling = false;
        }
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
    this.falling = true;
    this.turn_left = random([true, false]);
    this.rotate = true;
    this.change = false;

    // NEED TO REDO THIS
    this.jump = function() {
        this.speedY = random(1, 2);
        this.posY -= this.speedY;

        if (this.posY < height - heightFloor) {
            this.falling = true;
        }

        if (this.posX < 5) {
            this.posX = width - 5;
        }
        if (this.posX > width - 5) {
            this.posX = 5;
        }
    }

    this.fall = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;

        if (this.posY > height - heightFloor) {
            this.speedX = 0;
            this.speedY = 0;
            this.rotate = false;
        }

        if (this.posX < 5) {
            this.posX = width - 5;
        }
        if (this.posX > width - 5) {
            this.posX = 5;
        }
    }

    this.show = function() {
        push();
        translate(this.posX, this.posY);
        rotate(this.rotation);
        image(img, 0, 0, this.lenX, this.lenY);
        pop();

        if (this.rotate) {
            if (abs(this.OGrotation - this.rotation) < 15 || this.change) {
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
                    this.rotation += random(0, 3);
                }
                else {
                    this.rotation -= random(0, 3);
                }
            }
            else {
                this.change = true;
            }
        }
    }
}
