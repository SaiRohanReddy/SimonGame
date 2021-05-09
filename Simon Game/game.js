buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;
$("#btn").on("click",startGame);
function startGame(){
    $("#btn").text("Start");
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
}


function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    level++;
    var randomeNumber = Math.floor(Math.random() * 3) +1;
    var randomChoseColor = buttonColors[randomeNumber];
    gamePattern.push(randomChoseColor);
    $("#" + randomChoseColor).fadeOut(100).fadeIn(100);
    playSound(randomChoseColor);
    
   
}

function buttonAnimation(ColorName) {
    $("#" + ColorName).addClass("pressed");
        setTimeout(function () {
          $("#" + ColorName).removeClass("pressed");
        }, 100);
    }

    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } else {
          playSound("wrong");
          $("body").addClass("game-over");
          $("#level-title").text("Game Over, Press Restart to Replay");
    
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
          startOver();
          $("#btn").text("Restart");
         
        }
    }

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
$(".btn").click(function(event){

    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    buttonAnimation(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
})

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
 
}
