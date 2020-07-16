var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentColor = 0;
let highScore = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  for (i = 0; i < gamePattern.length; i++) {
    playPattern(i);
  }
  level++;
  $('#level-title').text('Level ' + level);
}

$(document).on('keydown', function () {
  if (gamePattern.length === 0) {
    nextSequence();
  } else {
    console.log('The game has already begun!');
  }
});

$('.btn').click(function (event) {
  console.log(event.target.id);
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (userClickedPattern[currentColor] === gamePattern[currentColor]) {
    currentColor++;
    console.log('User Got the color right!');
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      currentColor = 0;
      setTimeout(nextSequence, 1500);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      $('.highScore').text(`Highest Level Achieved: ${highScore}`);
    }

    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 100);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $('#level-title').text('Game Over, Press Any Key to Restart');
  }
});

function playPattern(yeet) {
  setTimeout(function () {
    $('#' + gamePattern[yeet])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[yeet]);
  }, i * 500);
}

function playSound(name) {
  var audio = new Audio('Sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
