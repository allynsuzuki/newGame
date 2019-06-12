var myGamePiece;
var fish = [];
var bottle = [];
var plasticBag = [];
var can = [];
var soda = [];
var cigarette = [];
var seaweed = [];
var trashScore;
var trashCount = 0;
var bubble = [];



function startGame() {
    document.addEventListener("keydown", function (e) {
        if([37,38,39,40].indexOf(e.keyCode) > -1){
            e.preventDefault();
            // Do whatever else you want with the keydown event (i.e. your navigation).
        }
    }, false);
    myGameArea.canvas;
    // myGameArea.start();
    myGamePiece = new component(80, 50, "images/net.png", 10, 120, "image");
    //trashScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[4]);
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo=0;
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -4; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 4; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -4; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 4; }
    myGamePiece.newPos();
    myGamePiece.update();

    for (i = 0; i < can.length; i += 1) {

        if (myGamePiece.crashWith(can[i])) {
            can[i] = new component(1, 1, "", 1, 1, "");
            trashCount += 1;
            myGameArea.update()
        }
    }
    for (i = 0; i < bottle.length; i += 1) {
        if (myGamePiece.crashWith(bottle[i])) {
            bottle[i] = new component(1, 1, "", 1, 1, "");
            trashCount += 1;
            myGameArea.update()
        }
    }
    for (i = 0; i < soda.length; i += 1) {

        if (myGamePiece.crashWith(soda[i])) {
            soda[i] = new component(1, 1, "", 1, 1, "");
            trashCount += 1;
            myGameArea.update()
        }
    }
    for (i = 0; i < cigarette.length; i += 1) {

        if(myGamePiece.crashWith(cigarette[i])){
            cigarette[i] = new component(1, 1, "", 1, 1, "");
            trashCount +=1;
            myGameArea.update()
        }

    }

    for (i = 0; i < fish.length; i += 1) {

        if(myGamePiece.crashWith(fish[i])){
            myGameArea.stop()
            return;
        }

    }

    myGameArea.clear();
    myGameArea.frameNo += 1;

    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        var x = myGameArea.canvas.width;
        var y = myGameArea.canvas.height;

        var z = Math.floor(Math.random() * y) + 70;
        var k = Math.floor(Math.random() * y) + 70;
        var a = Math.floor(Math.random() * x) + 30;

        var bubPos1 = Math.floor(Math.random() * 300) + 400;

        can.push(new component(40, 40, "images/can.png", a, -20, "image"));
        fish.push(new component(40, 40, "images/fish.png", 0, a, "image"));
        bottle.push(new component(40, 40, "images/bottle.png", Math.floor(Math.random() * x) + 20, -20, "image"));
        soda.push(new component(20, 40, "images/soda.png", Math.floor(Math.random() * x) + 23, -10, "image"));
        cigarette.push(new component(30, 10, "images/cigarette.png", z+14, -15, "image"));
        bubble.push(new component(5, 5, "images/bubble.png", bubPos1, k, "image"));

    }
    for (var i = 0; i < fish.length; i += 1) {
        fish[i].speedX = 1;
        fish[i].newPos();
        fish[i].update();
    }

    for (var i = 0; i < can.length; i += 1) {
        can[i].speedY = .5;
        can[i].newPos();
        can[i].update();
    }

    for (var i = 0; i < bottle.length; i += 1) {
        bottle[i].speedY = .5;
        bottle[i].newPos();
        bottle[i].update();
    }

    for (var i = 0; i < soda.length; i += 1) {
        soda[i].speedY = .5;
        soda[i].newPos();
        soda[i].update();
    }

    for (var i = 0; i < cigarette.length; i += 1) {
        cigarette[i].speedY = .5;
        cigarette[i].newPos();
        cigarette[i].update();
    }


    for (var i = 0; i < bubble.length; i += 1) {
        bubble[i].speedY = -.5;
        bubble[i].newPos();
        bubble[i].update();
    }



   // trashScore.text="SCORE: " + trashCount;
  //  trashScore.update;
    document.getElementById("score").value = "SCORE: " + trashCount;

    myGamePiece.newPos();
    myGamePiece.update();
}

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;

    }

    function quiz(){
    document.getElementById("quiz").value = "The answer is 400 years!n"



}











