//NOTE: commented out code is for another animation, where user can drag around petals and release them after, disabled for now

var fallingPetals = new p5(function(sketch) {
    var img, numPetals, heightFloor, tolerance, mouseToler, rotatToler, rotatDiff;
    var petals = []; // Holds Petal objects
    var fell = []; // Keeps track of each petal object's location

    numPetals = 50;
    heightFloor = 10;
    tolerance = 5;
    //mouseToler = 10;
    rotateToler = 15;
    rotateDiff = 3;

    sketch.setup = function() {
        sketch.angleMode(sketch.DEGREES);
        sketch.imageMode(sketch.CENTER);
        var canvas = sketch.createCanvas(document.body.clientWidth, document.body.clientHeight);
        img = sketch.loadImage('../images/petal.png');
        // Prepare all petals and sets each 'fell' state to false
        for (var i = 0; i < numPetals; i++) {
            petals[i] = new Petal();
            fell[i] = false;
        }
    }

    sketch.draw = function() {
        sketch.noLoop();
        sketch.background('black');
        for (var i = 0; i < petals.length; i++) {
            // If petals hit edge of the screen, will continue onto other edge
            if (petals[i].posX < tolerance) {
                petals[i].posX = sketch.width - tolerance;
            }
            if (petals[i].posX > sketch.width - tolerance) {
                petals[i].posX = tolerance;
            }
            // If petals fall out of screen, 'fell' state is now true
            if (petals[i].posY > sketch.height) {
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
            sketch.remove();
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
    sketch.windowResized = function() {
      sketch.resizeCanvas(document.body.clientWidth, document.body.clientHeight);
    }

    function Petal() {
        // rotation
        this.OGrotation = sketch.random(360);
        this.rotation = this.OGrotation;
        // size of petal image (1:2 width length ratio)
        this.lenX = sketch.random(15, 20);
        this.lenY = this.lenX / 2;
        // position of petal (off screen initially)
        this.posX = sketch.random(sketch.width);
        this.posY = sketch.random(-500, -50);
        // speed of petals (direction of petal)
        this.speedX = sketch.random(-2, 2);
        this.speedY = sketch.random(1, 2);
        // rotation of petals side to side
        this.turn = sketch.random([true, false]);
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
            sketch.push();
            sketch.translate(this.posX, this.posY);
            sketch.rotate(this.rotation);
            sketch.image(img, 0, 0, this.lenX, this.lenY);
            sketch.pop();
            // rotate petals side to side
            if (this.rotate) {
                if (sketch.abs(this.OGrotation - this.rotation) < rotateToler || this.change) {
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
                        this.rotation += sketch.random(0, rotateDiff);
                    }
                    else {
                        this.rotation -= sketch.random(0, rotateDiff);
                    }
                }
                else {
                    this.change = true;
                }
            }
        }
    }
}, 'petals');

var bloomingFlowers = new p5(function(sketch) {
    var img, x, y, size, angles, pos;

    sketch.preload = function() {
        img = sketch.loadImage('../images/flower-petal.png');
    }

    sketch.setup = function() {
        sketch.angleMode(sketch.DEGREES);
        sketch.imageMode(sketch.CENTER);
        sketch.ellipseMode(sketch.CENTER);
        sketch.createCanvas($('#propic').width(), $('#propic').height());
        x = sketch.width - ((sketch.width - sketch.width / 2) / 2);
        y = (sketch.height - $('#propic img').height() / 2) / 2;
        size = $('#propic img').width() / 30;
        angles = [0, 45, 90, 135, 180, 225, 270, 315];
        pos = [[x, y - size], [x + size * 0.75, y - size * 0.75], [x + size, y], [x + size * 0.75, y + size * 0.75], [x, y + size], [x - size * 0.75, y + size * 0.75], [x - size, y], [x - size * 0.75, y - size * 0.75]];
    }

    sketch.draw = function() {
        //sketch.rect(sketch.width / 2, sketch.height / 2, $('#propic img').width() / 2, $('#propic img').height() / 2);
        for (var i = 0; i < pos.length; i++) {
            sketch.push();
            sketch.translate(pos[i][0], pos[i][1]);
            sketch.rotate(angles[i]);
            sketch.image(img, 0, 0, size * 0.8, size * 1.5);
            sketch.pop();
        }

        sketch.noStroke();
        sketch.fill('#fdfd96');
        sketch.ellipse(x, y, size, size);

        sketch.noLoop();
    }

    sketch.windowResized = function() {
      sketch.resizeCanvas($('#propic').width(), $('#propic').height());
    }
}, 'propic');
