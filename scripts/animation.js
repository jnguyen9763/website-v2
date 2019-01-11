var img, numPetals;
var petals = [];

numPetals = 50;

function setup() {
    angleMode(DEGREES);
    imageMode(CENTER);
    createCanvas($(window).width(), $(window).height() - 20);
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
    console.log(mouseX, mouseY);
    for (var i = 0; i < petals.length; i++) {
        if ((mouseX < petals[i].posX + 5 && mouseX > petals[i].posX - 5)  && (mouseY < petals[i].posY + 5 && mouseY > petals[i].posY - 5)) {
            console.log('Yes!');
            petals[i].falling = false;
        }
    }
}

function windowResized() {
  resizeCanvas($(window).width(), $(window).height() - 20);
}

function Petal() {
    this.rotation = random(360);
    this.lenX = random(15, 20);
    this.lenY = this.lenX / 2;
    this.posX = random(width);
    this.posY = random(-500, -50);
    this.speedX = random(-2, 2);
    this.speedY = random(1, 2);
    this.falling = true;

    this.jump = function() {
        this.speedY = random(1, 2);
        this.posY -= this.speedY;

        if (this.posY < height - 50) {
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

        if (this.posY > height - 5) {
            this.speedX = 0;
            this.speedY = 0;
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
    }
}
