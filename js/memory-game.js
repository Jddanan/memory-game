$(document).ready(function () {

});

// Variable
var got = {};
got.difficulty = 4; // Change the number of columns for the difficulty
got.col = 3;
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

//Function
got.start = function () {
    got.createBoard();
}
got.createBoard = function () {
    for (var i = 0; i < 3; i++) {
        $("#board").append("<div class ='row'>")
        for (var j = 0; j < got.difficulty; j++) {
            $(`.row:nth-child(${i + 1})`).append("<div>")
            $(`.row div:nth-child(${j + 1})`).addClass(`col-xs-${got.col}`)
            
        }
    }
    $(`.col-xs-${got.col}`).append("<div class='card'>")
    $(".card").css({"background":got.backCard,"background-size":"cover"})
}


got.start();