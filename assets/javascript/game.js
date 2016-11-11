$(document).ready(function() {

    $("body").css("background-image", "url('assets/images/brickwall.png')");

    // ******************** Variables declaration ***********************

    var addVal = 0;
    var crystalsVal = [];
    var currentSum;
    var randomTarget;
    var wins = 0;
    var losses = 0;

    // ******************** creating new elements in html to be displayed ***********************
    // adding wins and losses display fileds
    var $wins = $("<div>");
    var $losses = $("<div>");
    $wins.addClass("wins-js");
    $losses.addClass("losses-js");
    $("#stats").append($wins, $losses);
    $(".wins-js").html("Wins: ");
    $(".losses-js").html("Losses: ");

    var $winsScore = $("<span>");
    var $lossesScore = $("<span>");
    $winsScore.addClass("winsTrack");
    $lossesScore.addClass("lossesTrack");
    $(".wins-js").append($winsScore);
    $(".losses-js").append($lossesScore);
    $(".winsTrack").html("0");
    $(".lossesTrack").html("0");

    // adding targetNumber and currentSum display fileds
    var $targetNumber = $("<div>");
    var $currentSum = $("<div>");
    $targetNumber.addClass("targetNumber-js");
    $currentSum.addClass("currentSum-js");
    $("#gameProgress").append($targetNumber, $currentSum);
    $(".targetNumber-js").html("Target: ");
    $(".currentSum-js").html("Score: ");

    var $targetTrack = $("<span>");
    var $targetSum = $("<span>");
    $targetTrack.addClass("targetTrack-js");
    $targetSum.addClass("targetSum-js");
    $(".targetNumber-js").append($targetTrack);
    $(".currentSum-js").append($targetSum);
    $(".targetTrack-js").html("0");
    $(".targetSum-js").html("0");

    // adding instructions and startOver display fields
    var $inst = $("<div>");
    var $startOver = $("<div>");
    $inst.addClass("inst");
    $startOver.addClass("startOver");
    $("#message").append($inst, $startOver);
    $(".inst").html("Instructions");
    $(".startOver").html("Star Over");

    // adding instruction message
    // var text = "Each crystal has a value. Clicking on any of them will add to your score.<br> Match your score to the target's value and you win.<br> Crystal's value will change on each new game.<br><br>Click on message to hide text.</p>";
    // how to dynamically indent without creating new div or a list
    var note1 = "&#8226  Each crystal has a value. Clicking on any of them will add to your score.";
    var note2 = "&#8226  Match your score to the target's value and you win. Crystal's value will change on each new game.";
    var note3 = "&#8226  Start Over will reset all values and start new game. You will lose your accumulated wins though.";
    var note4 = "&#42&#42&#42  Click on message to hide text &#42&#42&#42";

    var $pseudoModal = $("<div>");
    $pseudoModal.addClass("message");
    $("#stats").append($pseudoModal);

    $(".message").css({ display: "none" });
    $('.inst').mousedown(function() {
        $(".message").css({ display: "block" });
        $(".message").html(note1 + "<br>" + note2 + "<br>" + note3 + "<br>" + "<br>" + note4);
        
        // ****  Not working fade in slow
        // $('.message').fadeIn("slow", function(){
        //              $(".message").html('<p>' + text + '<p>');
        // });
    });
    $('.message').mouseup(function() {
        $('.message').fadeOut("slow")
    });

    //  Start Over button on click








    // ******************** Let's Play *********************** //

    letsPlay();

    // *** initialize/reset *** //
    function startOver() {
        addVal = 0;
        crystalsVal = [];
        $("#crystals").empty();
        $(".targetSum-js").html(addVal);
        console.log("start Over");
        letsPlay();
    }

    function letsPlay() {

        // *** Generate a random number between 1 and 15 *** //
        for (i = 0; i < 4; i++) {
            random1 = Math.floor(Math.random() * 15) + 1;
            crystalsVal.push(random1);
        }

        console.log(crystalsVal);

        // *** Generate a random number between 21 and 120 *** //

        randomTarget = Math.floor(Math.random() * 100) + 21;
        $(".targetNumber").html("target number = " + randomTarget);
        $(".targetTrack-js").html(randomTarget);
        console.log("targetNumber is= " + randomTarget);


        // *** set up crystals *** //

        for (i = 0; i < crystalsVal.length; i++) {
            var crystalImg = "assets/images/image";
            crystalImg += i + ".png";

            // creating img element
            var imgButt = $("<img>");

            // adding attributes and data to images
            imgButt.attr("src", crystalImg);
            imgButt.addClass("crystalButton");
            imgButt.attr("data-test", crystalsVal[i]);

            // appending to div id=crystals in html
            $("#crystals").append(imgButt);
        }

        // *** on click *** //

        $(".crystalButton").on("click", function() {
            var temp = ($(this).data("test"));
            addVal += temp;
            console.log("addVal= " + addVal);
            // displaying current click sum
            $(".targetSum-js").html(addVal);
            if (addVal == randomTarget) {
                console.log("You've got it!");
                wins++;
                // displaying number of wins
                $(".winsTrack").html(wins);
                startOver();
            } else if (addVal > randomTarget) {
                console.log("You've lost");
                losses++;
                // tracking number of losses
                $(".lossesTrack").html(losses);
                startOver();
            } else {
                console.log("Not there yet. Keep going")
            };

        });


    } // end of letsPlay


}); // end of document ready function
