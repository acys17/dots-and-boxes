const dotArray = Array.from(document.querySelectorAll(".dot"));
const dots = dotArray.map(dot => dot.id);
const visibleLines = document.getElementsByClassName("line-visible");
const squares = Array.from(document.querySelectorAll(".square"));
const squaresId = squares.map(square => square.id);
const score = document.getElementById("score");
const winnerCardHTML = document.getElementById("winnerCard");
const newGameButton = document.getElementById("newGame");

let squareToShow;
let squareDotsArray;
let topLeft;
let bottomLeft;
let topRight;
let bottomRight;
let isTopLineVisible;
let isLeftLineVisible;
let isRightLineVisible;
let isBottomLineVisible;
let visibleLineIds;

let playerOneTurn = true;
let playerOneSecondTurn = false;
let playerTwoSecondTurn = false;

let firstDot = "";
let secondDot = "";

let playerOneScore = 0;
let playerTwoScore = 0;

const playerTurn = ((lineToShow) => {
    if(playerOneTurn || playerOneSecondTurn) {
        lineToShow.classList.add("showPlayerOne", "line-visible");
        playerOneTurn = !playerOneTurn;
    } else if(!playerOneTurn || playerTwoSecondTurn) {
        lineToShow.classList.add("showPlayerTwo", "line-visible");
        playerOneTurn = !playerOneTurn;
    }
});

const showSquare = (() => {
    squaresId.forEach(square => { 
        squareDotsArray = square.split("-");
        topLeft = squareDotsArray[0];
        bottomLeft = squareDotsArray[1];
        topRight = squareDotsArray[2];
        bottomRight = squareDotsArray[3];
        
        isTopLineVisible = `${topLeft}-${topRight}`
        isLeftLineVisible = `${topLeft}-${bottomLeft}`
        isRightLineVisible = `${topRight}-${bottomRight}`
        isBottomLineVisible = `${bottomLeft}-${bottomRight}`
        
        squareToShow = document.getElementById(square);
        
        isPlayerOneSquare();
        
    })
})

const scoreDisplay = () => {
    score.innerHTML = `
        <p>SCORE:</p>
        <p>Player 1: ${playerOneScore}</p>
        <p>Player 2: ${playerTwoScore}</p>
    `
}

const winner = () => {
    let winner;
    console.log(playerOneScore);
    console.log(playerTwoScore);
    if(playerOneScore > playerTwoScore) {
        winner = "Player One"; 
    } else {
        winner = "Player Two";
    }
    winnerCardHTML.innerHTML = `
    <p id="congratulations">Congratulations ${winner} wins!!</p>
    <p id="finalScore">Final score: ${playerOneScore} - ${playerTwoScore}</p> 
    `
    winnerCardHTML.style.visibility = "visible";
}

const isPlayerOneSquare = () => {
    if(visibleLineIds.includes(isTopLineVisible) && visibleLineIds.includes(isLeftLineVisible) && visibleLineIds.includes(isRightLineVisible) && visibleLineIds.includes(isBottomLineVisible)) {
        if(!((squareToShow.classList).contains("showSquareOne")) && !((squareToShow.classList).contains("showSquareTwo"))) {
            if(!playerOneTurn) {
                squareToShow.classList.add("showSquareOne");
                playerOneScore ++;
                playerOneSecondTurn = true;
            } else if(playerOneTurn) {
                squareToShow.classList.add("showSquareTwo");
                playerTwoScore ++;
                playerTwoSecondTurn = true;
            }
        } else {
            playerOneSecondTurn = false;
            playerTwoSecondTurn = false;
        }
    }
    if((playerOneScore + playerTwoScore) === 9) {
        winner();
    }
    scoreDisplay()
}

dots.forEach(dot => {
    document.getElementById(dot).addEventListener("click", (event) => {
        // selects dot and deselects all other dots
        dots.forEach(dot => {
        return document.getElementById(dot).classList.remove("selected");
        })
        event.target.classList.add("selected");
        // assigns clicked dot to first or second
        if(firstDot === "" || firstDot === event.target.innerText) {
            firstDot = event.target.innerText; // e.g. "a1"
            secondDot = "";
        } else if(secondDot === "") {
            secondDot = event.target.innerText;
            let firstDotArray = firstDot.split("");
            let secondDotArray = secondDot.split("");
        
            let firstDotFirstCharacter = firstDotArray[0];
            let secondDotFirstCharacter = secondDotArray[0];
            let firstDotSecondCharacter = firstDotArray[1];
            let secondDotSecondCharacter = secondDotArray[1];

            if((firstDotFirstCharacter === secondDotFirstCharacter && firstDotSecondCharacter !== secondDotSecondCharacter) || (firstDotSecondCharacter === secondDotSecondCharacter && firstDotFirstCharacter !== secondDotFirstCharacter)) {
        
            let lineId = `${firstDot}${secondDot}`;
            const lineToShow = (document.getElementsByClassName(`${lineId}`))[0];

            if(!((lineToShow.classList).contains("line-visible"))) {
                playerTurn(lineToShow);
            }

            const visibleLinesArray = Array.from(visibleLines);
            visibleLineIds = visibleLinesArray.map(line => line.id)
            
            showSquare();
        
            // resets turn
            firstDot = "";
            secondDot = "";
            event.target.classList.remove("selected");

            } else {
            firstDot = "";
            secondDot = "";
            event.target.classList.remove("selected");
            }
        }
    });
});

newGameButton.addEventListener("click", () => {
    location.reload()
})
