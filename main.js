const dotArray = Array.from(document.querySelectorAll(".dot"));
const dots = dotArray.map(dot => dot.id);
const visibleLines = document.getElementsByClassName("line-visible");
const squares = Array.from(document.querySelectorAll(".square"));
const squaresId = squares.map(square => square.id);
const score = document.getElementById("score");

let playerOneTurn = true;

let firstDot = "";
let secondDot = "";

let playerOneScore = 0;
let playerTwoScore = 0;

const playerTurn = ((lineToShow) => {
    if(playerOneTurn === false) {
        lineToShow.classList.add("showPlayerTwo", "line-visible");
        playerOneTurn = !playerOneTurn;
    } else {
        lineToShow.classList.add("showPlayerOne", "line-visible");
        playerOneTurn = !playerOneTurn;
    }
});

const scoreDisplay = () => {
    score.innerHTML = `
        <p>SCORE:</p>
        <p>Player 1: ${playerOneScore}</p>
        <p>Player 2: ${playerTwoScore}</p>
    `
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
            const visibleLineIds = visibleLinesArray.map(line => line.id)

            const showSquare = (() => {
                squaresId.forEach(square => { 
                    const squareDotsArray = square.split("-");
                    const topLeft = squareDotsArray[0];
                    const bottomLeft = squareDotsArray[1];
                    const topRight = squareDotsArray[2];
                    const bottomRight = squareDotsArray[3];

                    const isTopLineVisible = `${topLeft}-${topRight}`
                    const isLeftLineVisible = `${topLeft}-${bottomLeft}`
                    const isRightLineVisible = `${topRight}-${bottomRight}`
                    const isBottomLineVisible = `${bottomLeft}-${bottomRight}`

                        if(visibleLineIds.includes(isTopLineVisible) && visibleLineIds.includes(isLeftLineVisible) && visibleLineIds.includes(isRightLineVisible) && visibleLineIds.includes(isBottomLineVisible)) {
                            const squareToShow = document.getElementById(square);
                            if(!((squareToShow.classList).contains("showSquareOne"))) {
                                if(!playerOneTurn) {
                                    squareToShow.classList.add("showSquareOne");
                                    playerOneScore ++;
                                } else {
                                    squareToShow.classList.add("showSquareTwo");
                                    playerTwoScore ++;
                                }
                            }
                            scoreDisplay()
                        }
                    })
            })
            
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