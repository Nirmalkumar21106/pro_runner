// This is a comment
var space = document.getElementById("sheet")
var cnxt = space.getContext('2d');
var mypiece;
var upper = [];
var lower = [];
var obstacle = [];
var powerup = []
var interval = 0,
    l = 0,
    interval1 = 0,
    interval2 = -3081,
    interval3 = -4281
var up_or_down = [275, 175]
var onclks_count = 0
space.width = 750
space.height = 450
var w_upper = 0,
    j_upper = 3,
    w_lower = 0,
    j_lower = 3,
    random_obstacle = 0,
    random_powerup = 0
var total_interval = 753,
    total_interval1 = 753,
    confuser = 0,
    distance = -81,
    highest_score = 0,
    speed = 1

var c = document.getElementById("points")
var d = document.getElementById("score")


d.innerHTML = localStorage.getItem(highest_score)

function startGame() {
    mypiece = new component(30, 250, 50, 50, "blue", 50, 0)
    upper.push(new component(0, 0, 751, 150, 'black', 0, 0))
    lower.push(new component(0, 300, 600, 150, 'black', 150, 0))
    myGameArea.start()
}
var myGameArea = {

    start: function() {

        this.interval = setInterval(updateGameArea, (15 - speed));
    },
    clear: function() {
        cnxt.clearRect(0, 0, 750, 450);
    },
    intervalstop: function() {
        clearInterval(this.interval)
    },
    stop: function() {

        clearInterval(this.interval);
        if (distance > localStorage.getItem(highest_score)) {
            localStorage.setItem(highest_score, distance)
            d.innerHTML = localStorage.getItem(highest_score, 10)
        }

    }
}

function updateGameArea() {
    distance += 3
    interval2 += 3
    interval3 += 3
    if (distance % 3000 == 0) {
        myGameArea.intervalstop()
        speed += 2
        mypiece.colour = "blue"
        myGameArea.start()
    }
    c.innerHTML = distance
    for (i = 0; i < lower.length; i += 1) {
        if (lower[i].x > -(lower[i].width + lower[i].gap - 50)) {
            if (mypiece.gameover1(lower[i])) {
                myGameArea.stop()

            }
        }
    }
    for (i = 1; i < upper.length; i += 1) {
        if (upper[i].x > -(upper[i].width + upper[i].gap - 50)) {
            if (mypiece.gameover(upper[i], i)) {
                myGameArea.stop()

            }
        }
    }
    for (i = 0; i < obstacle.length; i += 1) {
        if (obstacle[i].x > -25) {
            if (mypiece.gameover2(obstacle[i])) {
                obstacle[i].colour = 'white'
                if (mypiece.colour != "white") {
                    mypiece.colour = "red"
                    myGameArea.stop()
                }

            }
        }
    }
    for (i = l; i < powerup.length; i += 1) {
        if (powerup[i].x > -25) {
            if (mypiece.gameover2(powerup[i])) {
                powerup[i].colour = "white"
                var choice = Math.floor(Math.random() * 3)
                if (choice == 1) {
                    slow();
                    l += 1
                } else {
                    invi()
                    l += 1
                }
            }
        }
    }

    function invi() {
        mypiece.colour = "white"
    }

    function slow() {
        mypiece.colour = "green"
        speed -= 5
        myGameArea.intervalstop()
        myGameArea.start()
    }

    myGameArea.clear()
    interval += 3
    interval1 += 3
    if ((w_upper + j_upper) == interval) {
        interval = 0

        w_upper = Math.floor((Math.random() * 387) + 90) * 3
        j_upper = Math.floor((Math.random() * 45) + 30) * 3
        total_interval += w_upper
        total_interval += j_upper
        upper.push(new component(750, 0, w_upper, 150, 'black', j_upper, 0))
        confuser += 1
    }
    if ((w_lower + j_lower) == interval1) {
        interval1 = 0
        w_lower = Math.floor((Math.random() * 387) + 90) * 3
        j_lower = Math.floor((Math.random() * 45) + 30) * 3
        total_interval1 += w_lower
        total_interval1 += j_lower
        lower.push(new component(750, 300, w_lower, 150, 'black', j_lower, 0))
        confuser += 1
    }
    if (confuser <= 2 && confuser > 0) {
        if (((total_interval > total_interval1) && (total_interval1 > (total_interval - j_upper))) || ((total_interval == total_interval1) && (j_upper == j_lower)) || ((total_interval < total_interval1) && (total_interval > (total_interval1 - j_lower)))) {
            upper.push(new component(750, 0, w_upper + j_upper, 150, 'black', j_upper, 1))
        }
        confuser = 0
    }
    if (distance >= 3000 && interval2 == random_obstacle) {
        obstacle.push(new component(750, 275, 21, 21, 'red', 0, 0))
        random_obstacle = Math.floor((Math.random() * 900) + 333) * 3
        interval2 = 0

    }
    if (distance >= 4200 && interval3 == random_powerup) {

        powerup.push(new component(750, up_or_down[Math.floor(Math.random() * 2)], 25, 25, 'green', 0, 0))
        random_powerup = Math.floor((Math.random() * 1.4) + 1.4) * 3000
        interval3 = 0

    }
    obstacle.forEach(ball => {
        ball.x -= 3

        if (distance % 75 == 0) {
            if (ball.extras == 0) {
                ball.y -= 50
                ball.extras = 1
            } else if (ball.extras == 1) {
                ball.y -= 50
                ball.extras += 1
            } else if (ball.extras == 2) {
                ball.y += 50
                ball.extras += 1
            } else {
                ball.y += 50
                ball.extras = 0
            }
        }


        ball.obstacle_updater()
    })
    powerup.forEach(power => {
        power.x -= 3
        power.obstacle_updater()
    })
    upper.forEach(element => {
        element.x -= 3
        element.update()
    });

    lower.forEach(piece => {
        piece.x -= 3
        piece.update()
    });
    mypiece.updater()
}

function component(x, y, width, height, colour, gap, extras) {
    this.x = x
    this.width = width
    this.height = height
    this.colour = colour
    this.y = y;
    this.extras = extras
    this.gap = gap
    this.update = function() {
        cnxt.beginPath()
        cnxt.fillStyle = this.colour
        cnxt.fillRect(this.x, this.y, this.width, this.height);
        cnxt.closePath()
    }
    this.updater = function() {
        cnxt.beginPath();
        cnxt.moveTo(this.x, this.y + this.gap);
        cnxt.lineTo(this.x + 30, this.y);
        cnxt.lineTo(this.x + 50, this.y + this.gap);
        cnxt.fillStyle = this.colour;
        cnxt.fill();
        cnxt.closePath();


    }
    this.obstacle_updater = function() {
        cnxt.beginPath();
        cnxt.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
        cnxt.closePath();
        cnxt.fillStyle = this.colour;
        cnxt.fill();



    }
    this.gameover1 = function(obj) {
        crash = false
        if (obj.y == this.y + this.height && (obj.x + obj.width <= 40) && (obj.x + obj.width >= -(obj.gap - 70)) && this.colour != "white") {
            crash = true
        }
        return crash
    }
    this.gameover = function(obj, n) {
        crash = false
        var h = n
        if (obj.height == this.y - 50 && (obj.x + obj.width <= 40) && (obj.x + obj.width >= -(obj.gap - 70)) && this.colour != "white") {
            if (upper[h + 1].extras != 1 && obj.extras != 1) {
                crash = true
                console.log(upper[h + 1], obj)
            }
        }
        return crash
    }
    this.gameover2 = function(obj) {
        crash = false
        if (((obj.x - 21 <= this.x + 44.9 && obj.x + 21 >= this.x + 44.7) && obj.y + 25 == this.y + this.gap) || ((obj.x - 21 <= this.x + 44.9 && obj.x + 21 >= this.x + 50) && obj.y - 25 == this.y + this.gap)) {
            crash = true
        }
        return crash
    }
}
space.addEventListener("click", move)

function move() {
    if (onclks_count == 0) {
        mypiece.y -= 50
        mypiece.gap -= 100
        onclks_count = 1
    } else {
        mypiece.y += 50
        mypiece.gap += 100
        onclks_count = 0
    }
}
var btn = document.getElementById("btn")

function playagain() {
    myGameArea.stop()
    distance = -81
    myGameArea.clear()
    upper = [];
    lower = [];
    obstacle = [];
    powerup = []
    interval = 0
    interval1 = 0
    interval2 = -3081
    interval3 = -4281
    onclks_count = 0
    space.width = 750
    space.height = 450
    w_upper = 0
    j_upper = 3
    w_lower = 0
    j_lower = 3
    total_interval = 753
    total_interval1 = 753
    confuser = 0
    speed = 1
    random_obstacle = 0
    random_powerup = 0
    startGame()
}