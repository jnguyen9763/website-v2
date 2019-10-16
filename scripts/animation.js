var fallingPetals = new p5(function(sketch) {
    var img, numPetals, heightFloor, tolerance, mouseToler, rotatToler, rotatDiff;
    var petals = []; // Holds Petal objects
    var fell = []; // Keeps track of each petal object's location

    numPetals = 75;
    heightFloor = 10;
    tolerance = 5;
    rotateToler = 15;
    rotateDiff = 3;

    sketch.setup = function() {
        sketch.angleMode(sketch.DEGREES);
        sketch.imageMode(sketch.CENTER);
        sketch.createCanvas(document.body.clientWidth, document.body.clientHeight);
        img = sketch.loadImage('../images/petal.png');
        // Prepare all petals and sets each 'fell' state to false
        for (var i = 0; i < numPetals; i++) {
            petals[i] = new Petal();
            fell[i] = false;
        }
    }

    sketch.draw = function() {
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
            
            petals[i].fall();
            petals[i].show();
        }
        // If all petals are out of screen, stop animation and remove the canvas
        if (fell.every(function(val) { return val == true; })) {
            sketch.remove();
        }
    }
    
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
        this.posY = sketch.random(-1000, -25);
        // speed of petals (direction of petal)
        this.speedX = sketch.random(-2, 2);
        this.speedY = sketch.random(1, 2);
        // rotation of petals side to side
        this.turn = sketch.random([true, false]);
        this.rotate = true;
        this.change = false;
        
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