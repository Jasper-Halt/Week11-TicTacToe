console.log("Testing"); // initial console test that JS file is properly linked.

const cells = document.querySelectorAll(".cell"); //setting attributes to respond to input.
const gameStatus = document.querySelector("#gameStatus");
const restartBtn = document.querySelector("#resetGame");
const gameWins = [ //sets an array of all winning combinations.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""]; //initial values are blank
let currentPlayer = "X"; // initial Player is "X"
let running = false; //default condition is game is not running.

function startGame(){ //creates a function for starting the game
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //event listener for when a cell is clicked.
    restartBtn.addEventListener("click", restartGame); //event listener for clicking the "New Game" button.
    gameStatus.textContent = `Current Player: ${currentPlayer}`; //object literal identifying which player's turn it is.
    running = true;
}
function cellClicked(){  //function for when a cell is clicked
    const cellIndex = this.getAttribute("cellIndex"); //identifies that action should occur on the clicked cell Index.

    if(options[cellIndex] != "" || !running){  // if the cell has already been filled, then no change occurs
        return;
    }

    cellChange(this, cellIndex); //checks after cell change to see if win conditions have been met.
    checkWinner();
}
function cellChange(cell, index){   //updates cell according to the cell clicked.
    options[index] = currentPlayer;  //sets the cell clicked to the current player ("X" or "O")
    cell.textContent = currentPlayer; //enters "X" or "O" in that cell.
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";  //current player switches between "X" and "O"
    gameStatus.textContent = `Current Player: ${currentPlayer}`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < gameWins.length; i++){   //for loop to check for win conditions.
        const condition = gameWins[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){ //if/else statement to either continue the game or declare a winner.
            continue; 
        }
        else if (cellA == cellB && cellB == cellC){
            roundWon = true;
        }
    }

    if(roundWon){
        gameStatus.textContent = `The winner is ${currentPlayer}!`;  //declares the winner when the round is won.
        running = false;                                            //after the winner is declared, game stops.
    }
    else if(!options.includes("")){                            //sets conditions for a draw.
        gameStatus.textContent = `
        CAT! This game ended in a draw.
        `;
        running = false;
    }
    else{                                                     //if no winner, change player.
        changePlayer();
    }
}
function restartGame(){                                       //when "New Game" button is clicked, resets the default conditions for the game.
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `Current Player: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

startGame(); //calls the function to start the game.
