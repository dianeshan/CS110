//const {attachment } = require("express/lib/response")

window.addEventListener("load", (event) => {
    console.log("page fully loaded");
    document.getElementById("rock").addEventListener("click", () => play("rock"));
    document.getElementById("paper").addEventListener("click", () => play("paper"));
    document.getElementById("scissors").addEventListener("click", () => play("scissors"));
});


function play(userSelection) {

    /* computer selection */
    var computer = randomChoice()
    //var message = document.getElementById("result").innerHTML;

    if (userSelection == computer) {
        // message.innerHTML("It's a tie!");
        // message = "It's a tie!"
        document.getElementById("result").innerHTML = "It's a tie!"
    }
    else if ((computer == "paper" && userSelection == "rock") || (computer == "rock" && userSelection == "scissors") || (computer == "scissors" && userSelection == "paper")) {
        // message.innerHTML("Computer won");
        // message = "Computer won!"
        document.getElementById("result").innerHTML = "Computer won!"
    }
    else {
        // message.innerHTML("User won");
        // message = "User won!"
        document.getElementById("result").innerHTML = "User won!"
    }
        
}

function randomChoice() {
    var computerChoice = Math.floor(Math.random() * 3 + 1);

    switch (computerChoice) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissor";
    }
}