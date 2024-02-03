const character = document.querySelector(".character-container");
const characterImageClass = document.querySelector(".character");

const element = document.querySelector(".element-container");
const elementText = document.querySelector(".element-text");
const elementTextArr = ['Chocolate Day', 'Rose Day', 'Kiss Day', 'Teddy Day', 
                        'Take Care', 'Valentine Day', 'Hug Day', 'Promise Day',
                        'Good Morning', 'Good Night', 'I Love You', 'Sweet Dreams', 
                        'Romantic'];

let elementTextArrIndex;

const btn = document.querySelector(".btn");
let btnText = ["START", "Play-Again"];
let score = 0;

const scoreBox = document.querySelector(".score-box");
const startingText = document.querySelector(".starting-text");

const moveSound = new Audio("sounds/movement.mp3");
const music = new Audio("sounds/gameMusic.mp3");
const gameOverSound = new Audio("sounds/crying.mp3");

btn.innerText = btnText[0];
btn.style.display = "block";


function rightMove(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(characterLeft < 450){
        characterLeft += 150;
    }
    character.style.left = characterLeft + "px";
}

function leftMove(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(characterLeft > 0){
        characterLeft -= 150;
    }
    character.style.left = characterLeft + "px";
}

btn.addEventListener("click", () =>{
    document.addEventListener("keydown", () =>{
        element.classList.add("animation");
        startingText.style.display = "none";
        element.style.animationDuration = "5s";
    }, { once: true})

    score = 0;
    scoreBox.innerText = score;
    btn.style.display = "none";
    btn.innerText = btnText[1];
    startingText.style.display = "block"; 
    characterImageClass.style.backgroundImage = "url('images/chad character 170.png')";
    music.play();
    music.volume = 0.2;
    music.currentTime = 0;
    music.loop = true;
    gameOverSound.pause();
})

document.addEventListener("keydown", (e) =>{
    if(e.key == 'ArrowRight'){
        moveSound.play();
        rightMove();
    }
    if(e.key == 'ArrowLeft'){
        moveSound.play();
        leftMove();
    }
})


element.addEventListener("animationiteration", () =>{
    let position = Math.floor(Math.random()*4);
    element.style.left = position*150 +"px";
    elementTextArrIndex = Math.floor(Math.random() * elementTextArr.length);
    elementText.innerText =  elementTextArr[elementTextArrIndex];
    score++;
    scoreBox.innerText = score;

})
 
function gameOver(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let elementLeft = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
    let elementBottom = parseInt(window.getComputedStyle(element).getPropertyValue("bottom"));

    if(characterLeft === elementLeft && (elementBottom >= 10 && elementBottom <= 160)){
        btn.style.display = "block";
        music.pause();
        element.classList.remove("animation");
        gameOverSound.play();
        characterImageClass.style.backgroundImage = "url('images/crying chad 150.png')";
    }
}

setInterval(()=>{
    gameOver();
}, 10)

       
// to increase speed 
function speed(){
    let duration = parseFloat(window.getComputedStyle(element).getPropertyValue("animation-duration")); 
    let setDuration = duration - 0.0004;
    element.style.animationDuration = setDuration+"s";   
}

function speedSlow(){
    let duration = parseFloat(window.getComputedStyle(element).getPropertyValue("animation-duration")); 
    let setDuration = duration - 0.00015;
    element.style.animationDuration = setDuration+"s";
}

setInterval(()=>{
    let duration = parseFloat(window.getComputedStyle(element).getPropertyValue("animation-duration")); 
    if(duration  > 2.5){
        speed();          
    }else if((duration < 2.5) && (duration > 0.85)){
        speedSlow();
    }else{
        element.style.animationDuration = "0.85s"; 
    }   
},10)
