const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentColor = 0;
let highScore = 0;

function nextSequence() {
  console.log("Next Sequence");
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for (i = 0; i < gamePattern.length; i++) {
    playPattern(i);
  }
  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;
}

document.addEventListener("keydown", function () {
  if (gamePattern.length === 0) {
    nextSequence();
  } else {
    console.log("The game has already begun!");
  }
});

document.querySelector(".btn").addEventListener("onclick", function (event) {
  console.log(event.target.id);
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (userClickedPattern[currentColor] === gamePattern[currentColor]) {
    currentColor++;
    console.log("User Got the color right!");
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      currentColor = 0;
      setTimeout(nextSequence, 1500);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      document.querySelector(".highScore").innerHTML =
        `Highest Level Achieved: ${highScore}`;
    }

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 100);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    document.querySelector("#level-title").innerHTML =
      "Game Over, Press Any Key to Restart";
  }
});

//FadeIn and fadeOut needs to be rewritten in vanilla JS

function playPattern(color) {
  setTimeout(function () {
    document.querySelector("#" + gamePattern[color]).fadeIn(100).fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[color]);
  }, i * 500);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  document.querySelector("#" + currentColor).classList.add("pressed");

  setTimeout(function () {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}
