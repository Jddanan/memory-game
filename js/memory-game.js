$(document).ready(function () {

});

// Variable
var got = {};
got.difficulty = 4; // Change the number of columns for the difficulty
got.col = 12 / got.difficulty;
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
console.log(got.selectedCard); // to delete

}
got.bind = function () {
    $(".card").click(got.flipped)
}
//Create the board when the page is loaded
got.createBoard = function () {
    for (var i = 0; i < 3; i++) {
        $("#board").append("<div class ='row justify-content-center'>")
        for (var j = 0; j < got.difficulty; j++) {
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
    while (arr1.length < (got.col * 4)) {
        var r = Math.floor(Math.random() * got.cardArray.length);
        if (arr1.indexOf(r) === -1) {
            arr1.push(r);
            arr1.push(r);
        }
    }
    while (arr2.length < arr1.length) {
        var r = Math.floor(Math.random() * got.col * 4);
        if (arr2.indexOf(r) === -1) {
            arr2.push(r);
            var pushMe = arr1[r];
            got.selectedCard.push(got.cardArray[pushMe]);
        }
    }
} 


got.flipped = function (e) {
    var counter = 0;
    $(e.target).toggleClass("flip unflip");
    e.target.style.visibility = `visible`;
    e.target.style.pointerEvents = `none`;
}

got.start();

