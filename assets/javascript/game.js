$(document).ready(function() {

    $("body").css("background-image", "url('assets/images/brickwall.png')");

    // ******************************** Variables declaration *********************************** //

    var addVal = 0;
    var crystalsVal = [];
    var currentSum;
    var randomTarget;
    var wins = 0;
    var losses = 0;
    var reset = true;


    // ******************** creating new elements in html to be displayed *********************** //
    // dynamically adding wins and losses display fieldds
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

    // dynamically adding targetNumber and currentSum display fields
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

    // adding instructions message when clicking on Star Over
    var note1 = "&#8226  Each crystal has a value. Clicking on any of them will add to your score.";
    var note2 = "&#8226  Match your score to the target's value and you win. Crystal's value will change on each new game.";
    var note3 = "&#8226  Start Over will reset all values and start new game. You will lose your accumulated wins.";
    var note4 = "&#42&#42&#42  Click on message to hide text &#42&#42&#42";

    var $pseudoModal = $("<div>");
    $pseudoModal.addClass("message");
    $("#stats").append($pseudoModal);

    $(".message").css({ display: "none" });
    $('.inst').mousedown(function() {
        $(".message").css({ display: "block" });
        $(".message").html(note1 + "<br>" + note2 + "<br>" + note3 + "<br>" + "<br>" + "<p>" + note4 + "</p>");
    });

    $('.message').mouseup(function() {
        $('.message').fadeOut("slow")
    });

    // ************************************* Let's Play **************************************** //

    letsPlay();

    // *** Button press Start new game - resets all stats to zero *** //
    $('.startOver').on("click", function() {
        wins = 0;
        $(".winsTrack").html(wins);
        losses = 0;
        $(".lossesTrack").html(losses);
        startOver();
    });

    // *** Next game initialize/reset *** //
    function startOver() {
        addVal = 0;
        crystalsVal = [];
        $("#crystals").empty();
        $(".targetSum-js").html(addVal);
        letsPlay();
    }

    function letsPlay() {
        reset = true;
        // *** Generate a random number between 1 and 15 *** //
        for (i = 0; i < 4; i++) {
            random1 = Math.floor(Math.random() * 15) + 1;
            crystalsVal.push(random1);
        }

        // *** Generate a random number between 21 and 120 *** //
        randomTarget = Math.floor(Math.random() * 100) + 21;
        $(".targetNumber").html("target number = " + randomTarget);
        $(".targetTrack-js").html(randomTarget);

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
            // displaying current click sum
            $(".targetSum-js").html(addVal);
            if (addVal == randomTarget) {
                wins++;
                // displaying number of wins
                $(".winsTrack").html(wins);
                startOver();
            } else if (addVal > randomTarget) {
                losses++;
                // tracking number of losses
                $(".lossesTrack").html(losses);
                startOver();
            } else {
                // console.log("Not there yet. Keep going")
            };
        });
    } // end of letsPlay

}); // end of document ready function
