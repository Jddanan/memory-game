$(document).ready(function () {

});

// Variable
var got = {};
got.difficulty = 8; // Change the number of columns for the difficulty 4, 6 or 8 
got.col = 0;
got.cardArrayLength = 3 * got.difficulty;
var counterId = 0
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

//Function
got.start = function () {
    got.createBoard();
    got.selectImage();
    got.bind();
}
got.bind = function () {
    $(".card").click(got.flipped)
}
//Create the board when the page is loaded
got.createBoard = function () {
    if (got.difficulty === 4) {
        got.col = 3
    } else if (got.difficulty === 6) {
        got.col = 2
    } else if (got.difficulty === 8) {
        got.col = 1
    }
    for (var i = 0; i < 3; i++) {
        counterId = 1;
        $("#board").append("<div class ='row justify-content-center'>")
        for (var j = 0; j < got.difficulty; j++) {
            counter = (i + 3 * j)
            $(`.row:nth-child(${i + 1})`).append("<div>")
            $(`.row div:nth-child(${j + 1})`).addClass(`col-xs-${got.col} card unflip`)
        }

    }
    $(".unflip").css({ "background": got.backCard, "background-size": "cover" })
}
//Select number of image needed for the difficulty from my array of image and duplicate them
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


got.flipped = function (e, index) {
    var counter = 0;
    $(e.target).toggleClass("flip unflip");
    e.target.style.visibility = `visible`;
    e.target.style.pointerEvents = `none`;
    e.target.backgroundImage = `url('./img/${got.selectedCard[index]}')`;
}

got.start();

console.log(got.selectedCard); // to delete

