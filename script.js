const word = document.getElementById("word")
const text = document.getElementById("text")
const time = document.getElementById("time")
const score = document.getElementById("score")
const endGame = document.getElementById('end-game-container');
const form = document.getElementById('settings-form')
const typeComponent = document.getElementById('container')
const difficultySelect = document.getElementById('difficultyy')


//list of random words
const words = [
   'television',
    'because',
    'spiderman',
    'batman',
    'weather',
    'rain',
    'mouse',
    'keyboard',
    'monitor',
    'cpu',
    'screen',
    'apple',
    'mango',
    'superman'
]

let scores = 0;
let times = 10;
let randomWords;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

    difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

const timeInterval = setInterval(updateTime, 1000)

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom(){
    randomWords = getRandomWord();
    word.innerHTML = randomWords;
}

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWords){
        addWordToDom();
        updateScore();
        e.target.value = '';

        if(difficulty === 'hard'){
            times += 2;
        }else if(difficulty === 'medium'){
            times += 4;
        }else{
            times += 6
        }

        updateTime();
    }
})

function updateScore(){
    scores++;
    score.innerHTML = scores;
}

function updateTime(){
    times--;
    time.innerHTML = times
    if(times === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver(){
    endGame.innerHTML = `
    <h1>Your time is over</h1>
    <h1>Your final score is ${scores}</h1>
    <button onclick="location.reload()">Play again</button>
    `
    typeComponent.style.display = "none";
}

form.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});

addWordToDom()

