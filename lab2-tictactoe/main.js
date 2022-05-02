
let one = document.getElementsByClassName("one")[0];
let two = document.getElementsByClassName("two")[0];
let three = document.getElementsByClassName("three")[0];
let four = document.getElementsByClassName("four")[0];
let five = document.getElementsByClassName("five")[0];
let six = document.getElementsByClassName("six")[0];
let seven = document.getElementsByClassName("seven")[0];
let eight = document.getElementsByClassName("eight")[0];
let nine = document.getElementsByClassName("nine")[0];
let isPlayable = false;
let moveNum = 0;
let first = -1; //if first is 0 then that means the player goes first in the AI game otherwise the AI goes first
let plays = [-1,-1,-1,-1,-1,-1,-1,-1,-1];//array of 1's(X's) and 0's(O's), -1 means empty.
let x_points = 0;
let o_points = 0;

let isAIEnabled = false;
let timeLeft=30;
let interval=setInterval(countdown,1000);

function countdown(){
    if(!isPlayable){
        return;
    }
    if(timeLeft==1){
        timeLeft=31;
        //display message, and switch turn...
        isPlayable=false;
        document.getElementsByClassName("timeLeft")[0].innerHTML='TIME IS UP';
        
        isPlayable=true;
        moveNum=moveNum-1;
        if(isAIEnabled){
            setTimeout(function () {
                aiTurn();
                moveNum+=1;
                checkWin();
            }, 500)
        }
        if (moveNum % 2 != 0) {
            document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, O.';
        }
        else {
            document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';
        }
    }
    else{
        timeLeft=timeLeft-1;
        console.log(timeLeft);
        document.getElementsByClassName("timeLeft")[0].innerHTML='Time Left: ' + timeLeft.toString();
    }
    
}

window.addEventListener("load", (event) => {
    console.log("page fully loaded");
    one.addEventListener("click", () => turn("one"));
    two.addEventListener("click", () => turn("two"));
    three.addEventListener("click", () => turn("three"));
    four.addEventListener("click", () => turn("four"));
    five.addEventListener("click", () => turn("five"));
    six.addEventListener("click", () => turn("six"));
    seven.addEventListener("click", () => turn("seven"));
    eight.addEventListener("click", () => turn("eight"));
    nine.addEventListener("click", () => turn("nine"));

    document.getElementsByClassName("new_game")[0].addEventListener("click", () => newGame(isAIEnabled=false));
    document.getElementsByClassName("reset")[0].addEventListener("click", () => reset());
    document.getElementsByClassName("AI")[0].addEventListener("click", () => newGame(isAIEnabled=true));
    document.getElementsByClassName("Player2")[0].addEventListener("click", () => newGame(isAIEnabled=false));
    
    document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';
    document.getElementsByClassName("timeLeft")[0].innerHTML='Press New Game to Start!';

});

function decideFirstPlayer() {
    let temp = Math.floor(Math.random() * 2);
    if (temp == 0) {
        return 0;
    }
    else {
        return 1;
    }

}

//passed in position is the position that was clicked on
function turn(pos) {
    
    if (!isPlayable) {
        return;
    }
    timeLeft=31;
    //checks to see if the position is already taken
    let num = convertToNum(pos);
    num = num - 1;
    if (plays[num] != -1) {
        return;
    }

    if (moveNum % 2 == 0) {
        //output X
        let temp = document.getElementsByClassName(pos)[0];
        temp.getElementsByClassName("xo")[0].innerHTML = 'X';
        temp.getElementsByClassName("xo")[0].style.backgroundColor = '#f78072';
        plays[num] = 1;
        document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, O.';
    }
    else {
        //output O
        let temp = document.getElementsByClassName(pos)[0];
        temp.getElementsByClassName("xo")[0].innerHTML = 'O';
        temp.getElementsByClassName("xo")[0].style.backgroundColor = '#f78072';
        plays[num] = 0;
        document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';
    }
    
    
    moveNum += 1;
    if (!checkWin()) {
        if(isAIEnabled) {
            //AI does a move
            setTimeout(function () {
                aiTurn();
                moveNum+=1;
                checkWin();
            }, 500)
        }
    }
    
}

function aiTurn() {
    if (!isPlayable) {
        return;
    }
    let rand = Math.floor(Math.random() * 9);

    while (plays[rand] != -1) {
        rand = Math.floor(Math.random() * 9);
    }

    pos = convertToString(rand + 1);
    
    if (moveNum % 2 == 0) {
        //output X
        let temp = document.getElementsByClassName(pos)[0];
        temp.getElementsByClassName("xo")[0].innerHTML = 'X';
        temp.getElementsByClassName("xo")[0].style.backgroundColor = '#f78072';
        plays[rand] = 1;
        document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, O.';
    }
    else {
        //output O
        let temp = document.getElementsByClassName(pos)[0];
        temp.getElementsByClassName("xo")[0].innerHTML = 'O';
        temp.getElementsByClassName("xo")[0].style.backgroundColor = '#f78072';
        plays[rand] = 0;
        document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';
    }
    
}

function checkWin() {
    //checks if there is a winner!
    for(let i=0; i<plays.length-2; i++) {
        if(i%3==0){//if on the left side
            if(isSame(plays[i],plays[i+1],plays[i+2])){//check columns
                //indicate a win
                gameEnd(plays[i]);
                return true;
            }
        }
        if (i<3) {
            if(isSame(plays[i],plays[i+3],plays[i+6])){//check rows
                //indicate a win
                gameEnd(plays[i]);
                return true;
            }
        }
        if(i==0){//check diagonal from top left
            if(isSame(plays[0],plays[4],plays[8])){
                gameEnd(plays[i]);
                return true;
            }
        }
        if(i==2){//check diagonal from top right
            if(isSame(plays[2],plays[4],plays[6])) {
                gameEnd(plays[i]);
                return true;
            }
        }
    }
    if(moveNum>=9){
        gameEnd(-1);
        return true;
    }
    return false;
}

function isSame(a,b,c){//checks if 3 values are the same
    if (a == -1) {
        //checks to make sure that the array is populated 
        return false;
    }
    if(a==b && b==c){
        return true;
    }
    return false;
}


function gameEnd(winner) {
    //checks if there are any moves left
    console.log("game ended");
    isPlayable=false;
    let strWinner;
    if(winner == 1){
        strWinner="x_score";
        let t=document.getElementsByClassName(strWinner)[0];
        x_points++;
        t.innerHTML = x_points;
        document.getElementsByClassName("player")[0].innerHTML = 'Player X won the game!';
    }
    else if(winner == 0){
        strWinner="o_score";
        let t = document.getElementsByClassName(strWinner)[0];
        o_points++;
        t.innerHTML = o_points;
        document.getElementsByClassName("player")[0].innerHTML = 'Player O won the game!';
    }
    else {
        document.getElementsByClassName("player")[0].innerHTML = 'It is a TIE!';
    }
    //score is now updated
    
    
}

function reset() {
    //resets the whole game/board and scores
    newGame();
    x_points=0;
    o_points=0;
    let oscore = document.getElementsByClassName("x_score")[0];
    oscore.innerHTML=x_points;
    let xscore = document.getElementsByClassName("o_score")[0];
    xscore.innerHTML = o_points;
    document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';
    
}

function newGame() {
    //creates a new game which just clears the board
    timeLeft=31;
    board = document.getElementsByClassName("xo");
    for (i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }
    isPlayable=true;
    moveNum=0;
    for(i = 0;i<plays.length;i++){
        plays[i] = -1;
    }
    document.getElementsByClassName("player")[0].innerHTML = 'Its your turn, X.';

    if (isAIEnabled == true) {
        first = decideFirstPlayer();
        if (first != 0) {
            document.getElementsByClassName("player")[0].innerHTML = 'AI is X and goes first!';
            aiTurn();
            moveNum += 1;
        }
        else {
            document.getElementsByClassName("player")[0].innerHTML = 'You are X and you go first!';
        }
    }
    
}

//convert string number into number
function convertToNum(pos) {
    if (pos == "one") {
        return 1;
    }
    else if (pos == "two") {
        return 2;
    }
    else if (pos == "three") {
        return 3;
    }
    else if (pos == "four") {
        return 4;
    }
    else if (pos == "five") {
        return 5;
    }
    else if (pos == "six") {
        return 6;
    }
    else if (pos == "seven") {
        return 7;
    }
    else if (pos == "eight") {
        return 8;
    }
    else if (pos == "nine") {
        return 9;
    }
    
}

//convert number into string 
function convertToString(pos) {
    if (pos == 1) {
        return "one";
    }
    else if (pos == 2) {
        return "two";
    }
    else if (pos == 3) {
        return "three";
    }
    else if (pos == 4) {
        return "four";
    }
    else if (pos == 5) {
        return "five";
    }
    else if (pos == 6) {
        return "six";
    }
    else if (pos == 7) {
        return "seven";
    }
    else if (pos == 8) {
        return "eight";
    }
    else if (pos == 9) {
        return "nine";
    }
}