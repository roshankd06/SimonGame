var userClickedPattern=[]

var gamePattern=[]

var buttonColors=["red","blue","green","yellow"]

//bydefault, the game has not started
var started=false

//variable to keep the tracks of levels and initially the level will be zero
var level=0;

//to start the game, user has to press any key and after the keypress, the level will be set to zero
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//adding event listener using jquery
  $(".btn").click(function() {
      //storing the id of the button clicked in variable
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
    
      playSound(userChosenColour);
      animatePress(userChosenColour);
    
      checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
  
      }
  
    } else {
  
      playSound("wrong");
      $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        startOver()
  
    }
  
  }

  function nextSequence(){
    userClickedPattern = [];
        //incrementing the level by 1
        level++
        
        //updating the h1 with the current level 
        $("#level-title").text("Level " + level)


      // creating random number between 0 and 3
    var randomNumber= Math.floor(Math.random()*4)
    var randomChosenColour=buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    
    // Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    
 }

 //playing sound 
 function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
 }

 function animatePress(currentColor){
     // adding .pressed class to the button which is clicked
    $("#" + currentColor).addClass("pressed");
    //setting timeout for animation
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
 }

 function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
