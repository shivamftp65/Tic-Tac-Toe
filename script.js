let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-btn');
const player = document.querySelector('.player');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector("game-container");

let turnO = true;     // player-x player-O
let count = 0;  // to track the draw

player.innerText = `Player - ${turnO===true? "O":"X"}`

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.cursor = 'pointer'
    }
}

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
        box.style.cursor = "default"
    }
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turnO){
            box.innerText = "O";
            box.style.cursor='default';
            turnO= false;
            player.innerText = `Player -${turnO===true? "O":"X"}`
        } else{
            box.innerText = "X";
            box.style.cursor='default'
            turnO= true;
            player.innerText = `Player -${turnO===true? "O":"X"}`
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    })
    // box.disabled = true;
})

const gameDraw = () => {
    msg.innerText = `Game was a draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const showWinner = (winner) => {
    msg.innerText = `Congrats, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
}

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if(pos1Val != "" &&  pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);