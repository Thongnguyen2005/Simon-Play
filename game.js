var buttonColors = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// User only click once to begin the game
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    // Check if the game has started or not
    if(!started)
    {
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    
    //Reset user's pattern every time they finish clicking
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level " + level);

    var randNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randNum];

    gamePattern.push(randomChosenColor);

    //querySelect button
    var button = $('#' + randomChosenColor);
    button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $('#' + currentColor).addClass("pressed");
    
    //add and remove class "pressed" in 100 ms
    setTimeout(() => {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");

        //When user finish the challenge pattern
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        //Change the red background after 200 ms
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver()
    }
}

function startOver()
{
    gamePattern = [];
    level = 0;
    started = false;
}

