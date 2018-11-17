$(document).ready(function () {
    
});

// Variable
var got = {};
got.difficulty = 0; // Change the number of columns for the difficulty 4, 6 or 8 
got.col = 0;
got.cardArrayLength = 0;
got.backCard = "url(./images/card_back.jpg)";
got.cardArray = [
    "./images/card1.png",
    "./images/card2.png",
    "./images/card3.png",
    "./images/card4.png",
    "./images/card5.png",
    "./images/card6.png",
    "./images/card7.png",
    "./images/card8.png",
    "./images/card9.png",
    "./images/card10.png",
    "./images/card11.png",
    "./images/card12.png",
];
got.selectedCard = [];
got.counterId = 0;
got.count = 0;

//Function
//Create the board when the page is loaded
got.selectImage = function () {
    var arr1 = [];
    var arr2 = [];
    while (arr1.length < (got.cardArrayLength)) {
        var r = Math.floor(Math.random() * got.cardArray.length);
        if (arr1.indexOf(r) === -1) {
            arr1.push(r);
            arr1.push(r);
        }
    }
    while (arr2.length < arr1.length) {
        var r = Math.floor(Math.random() * got.cardArrayLength);
        if (arr2.indexOf(r) === -1) {
            arr2.push(r);
            var pushMe = arr1[r];
            got.selectedCard.push(got.cardArray[pushMe]);
        }
    }
}
//Select number of image needed for the difficulty from my array of image and duplicate them
got.createBoard = function () {
    if (got.difficulty === 4) {
        got.col = 3
    } else if (got.difficulty === 6) {
        got.col = 2
    } else if (got.difficulty === 8) {
        got.col = 1
    }
    $(`#board`).append(`<div id='header' class='row justify-content-center'>`);
    $('#header').append($('<button id="newGame"></button>'));
    $('#newGame').html("Restart")
    $('#newGame').on(`click`, function () {                          // refreshes the page, offering a new game to the user
        location.reload();
    })
    $("#board").append("<div id='guess' class='row justify-content-center'>");
    $("#guess").html("Wrong guesses:");
    $("#guess").prepend("<img id='mute' src='./images/mute.png'/>")
    $("#mute").on("click", function () {
        document.getElementById("myAudio").pause();
    });
    $("#guess").prepend("<img id='play' src='./images/play-button.png'/>");
    $("#play").on("click", function () {
        document.getElementById("myAudio").play();
    });
    for (var i = 0; i < 3; i++) {
        got.counterId = 1;
        $("#board").append("<div class ='row justify-content-center'>")
        for (var j = 0; j < got.difficulty; j++) {
            $(`.row:nth-child(${i + 3})`).append("<div>")
            $(`.row div:nth-child(${j + 1})`).addClass(`col-xs-${got.col} card unflip`)
        }
    }
    $(".unflip").css({ "background": got.backCard, "background-size": "cover" })
    document.getElementById("myAudio").play();
}

got.gameplay = function () {
    $(`.card`).on(`click`, function (e) {
        var index = $(`.card`).index(this);         // get selected card's index (0 -> total cols)
        $(this).toggleClass(`unflip flip`);
        got.flipped(e, index);
        if ($('.flip').length === 1) {
            got.selectedFirstCard = got.selectedCard[index];
        }
        if ($('.flip').length === 2) {
            got.selectedSecondCard = got.selectedCard[index];
            $(`.card`).css(`pointerEvents`, `none`);                         // user can't click on other cards while timeout
            got.checkMatch();
            window.setTimeout(function () {
                $(`.flip`).css(`backgroundImage`, `${got.backCard}`);
                $(`.card`).css(`pointerEvents`, `all`);                               // user can click again 
                $(`.guessed`).css(`pointerEvents`, `none`);
                got.selectedFirstCard = ``;
                got.selectedSecondCard = ``;
                $(`.flip`).toggleClass(`flip unflip`)
            }, [1000]);
        }
    });
}

got.flipped = function (e, index) {
    e.target.style.pointerEvents = `none`;
    e.target.style.backgroundImage = `url('${got.selectedCard[index]}')`;
}

got.checkMatch = function () {
    if (got.selectedFirstCard === got.selectedSecondCard) {
        $(`.flip`).addClass(`guessed`);
        $(`.flip`).removeClass(`flip`);
    } else {
        got.count++;
        $("#guess").html(`Wrong guesses: ${got.count}`)
    }
    if ($(".guessed").length === (got.cardArrayLength)) {
        got.endModal();
    }
}

got.startModal = function () {
    $('#startModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $('input[type=radio]').click(function () {
        got.difficulty = $(this).val();
        got.cardArrayLength = (3 * got.difficulty);
    });
    $("#continue").on("click", function () {
        if (got.difficulty !== 0) {
            $('#startModal').css(`display`, `none`);
            $(".modal-backdrop").css(`display`, `none`);
            got.start();
        } else {
            alert("Please select a difficulty")
        }
    })
};
got.startModal();

//Winning Modal
got.endModal = function () {
    $('#endModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $("#modal-score").html(`You made ${got.count} mistakes`);
    $("#restart").on("click", function () {
        location.reload();
    })
};



got.start = function () {
    got.selectImage();
    got.createBoard();
    got.gameplay();
}
