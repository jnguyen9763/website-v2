var img, numPetals, heightFloor, tolerance, mouseToler, rotatToler, rotatDiff;
var petals = [];

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
    for (var i = 0; i < numPetals; i++) {
        petals[i] = new Petal();
    }
}

function draw() {
    background('black');
    for (var i = 0; i < petals.length; i++) {
        if (petals[i].posX < tolerance) {
            petals[i].posX = width - tolerance;
        }
        if (petals[i].posX > width - tolerance) {
            petals[i].posX = tolerance;
        }
        if (petals[i].posY > height - heightFloor) {
                petals[i].speedX = 0;
                petals[i].speedY = 0;
                petals[i].rotate = false;
        }
        petals[i].fall();
        petals[i].show();
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
    this.OGrotation = random(360);
    this.rotation = this.OGrotation;
    this.lenX = random(15, 20);
    this.lenY = this.lenX / 2;
    this.posX = random(width);
    this.posY = random(-500, -50);
    this.speedX = random(-2, 2);
    this.speedY = random(1, 2);
    this.turn_left = random([true, false]);
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
