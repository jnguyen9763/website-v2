var img;

var petals = [];

function setup() {
    angleMode(DEGREES);
    imageMode(CENTER);
    createCanvas($(window).width(), $(window).height() - 20);
    img = loadImage('../images/petal.png');
    for (var i = 0; i < 50; i++) {
        petals[i] = new Petal();
    }
}

function draw() {
    //x = Math.random() * window.innerWidth;
    //y = Math.random() * window.innerHeight;
    background('black');
    for (var i = 0; i < petals.length; i++) {
        petals[i].show();
        petals[i].fall();
    }
}

function Petal() {
    //this.rotation = random(360);
    this.lenX = random(15, 20);
    this.lenY = this.lenX / 2;
    this.posX = random(width);
    this.posY = random(-500, -50);
    this.speedX = random(-2, 2);
    this.speedY = random(1, 2);

    this.fall = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;

        if (this.posY > height - 5) {
            this.speedX = 0;
            this.speedY = 0;
        }

        if (this.posX < 5 || this.posX > width - 5) {
            this.speedX *= -1;
        }
    }

    this.show = function() {
        //rotate(this.rotation);
        image(img, this.posX, this.posY, this.lenX, this.lenY);
    }
}
