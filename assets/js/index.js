
const gameIntro = document.getElementById("gameIntro");
const gameContainer = document.getElementById("gameContainer");
const timeDisplay = document.getElementById("timeDisplay");
let playing = false;
let score = 0;
let timeLeft = 60;
let timerInterval;


/** start the game, close the introduction and fetch a pokemon */
function start() {
    playing = true;
    score = 0;
    timeLeft = 60;
    gameIntro.classList.add("hide");
    gameContainer.classList.remove("hide");
    document.getElementById("guess").focus();
    // get the pokemon data when the game starts
    fetchData();
    startTimer();
}
/** timer function */
function startTimer(){
    timeDisplay.textContent = `You've got ${timeLeft} seconds left!`;
    timeDisplay.style.display = "block"
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `You've got ${timeLeft} seconds left!`;
        if(timeLeft <= 0){
            end();
        }
    }, 1000)
}
/** end the game and publish the results */
function end(){
    playing = false;
    clearInterval(timerInterval);
    gameContainer.classList.add("hide");
    gameIntro.classList.remove("hide");
    if(score >= 10){
        gameIntro.innerHTML = `
        <h3>Well done!</h3>
        <p id="analysis">You got ${score} pokemon correct in 60 seconds</p>
        <p><a href="https://github.com/Sjwilhelms" target="_blank">Find me on Github</a></p>
        <p id="reward"><a href="https://www.youtube.com/watch?v=xMk8wuw7nek" target="_blank">You've earned a poke-reward...</a></p>
        <button id="playAgain" class="btn" onclick="start()">Let's Go!</button>
        
    `}
    else{
        gameIntro.innerHTML = `
        <h3>That's too bad!</h3>
        <p id="analysis">You got ${score} pokemon correct in 60 seconds</p>
        <p><a href="https://github.com/Sjwilhelms" target="_blank">Find me on Github</a></p>
        <p id="reward">No poke-reward for you this time...</p>
        <button id="playAgain" class="btn" onclick="start()">Let's Go!</button>
    `}
}

/** function to get the pokemon data from pokeAPI. Use a random number to generate an index for the apiCall to load a random pokemon */

async function fetchData() {
    try {

        // ensures each new game starts without a result element showing

        resultHeader = document.getElementById("resultHeader");
        resultBody = document.getElementById("resultBody");
        document.getElementById("submit").style.display = "inline-block";
        resultHeader.style.display = "none";
        resultBody.style.display = "none";
        attempts = 0;

        // generate a random number to select the pokemon

        let randomIndex = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`);

        // get the data

        if (!response.ok) {
            throw new Error("Pokemon failed to load");
        }
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        pokemonName = data.name;
        formattedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        clueCharacter = formattedName.charAt(0);
        console.log(pokemonName);

        // display the sprite

        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    // catch any errors

    catch (error) {
        console.error(error);
    }
}

// add logic for keyboard controls

document.addEventListener("keydown", event => {
    if (event.key.startsWith("Enter")) {
        getGuess();
    }
})
document.addEventListener("keydown", event => {
    if (event.key.startsWith("ArrowRight")) {
        fetchData();
    }
})
document.addEventListener("keydown", event => {
    if (event.key.startsWith("ArrowLeft")) {
        clearGuess();
    }
})
function clearGuess() {
    document.getElementById("guess").value = "";
}

/** get the user guess and compare with the results from the data */

function getGuess() {

    let guess = document.getElementById("guess").value;
    scoreboard = document.getElementById("scoreboard");
    attempts++;


    // compare the guess to the data and get feedback

    if (guess === pokemonName || guess === formattedName) {
        score++;
        resultHeader.textContent = "Yay! You were right";
        resultBody.textContent = `The correct answer was ${formattedName}`;
        scoreboard.textContent = `You've guessed correctly ${score} times`;
        resultHeader.style.display = "block";
        resultBody.style.display = "block";
        scoreboard.style.display = "block";
        document.getElementById("guess").value = "";
        document.getElementById("submit").style.display = "none";
        document.getElementById("guess").focus();
        setTimeout(fetchData(), 1000)

    }
    else {
        if (attempts <= 1) {
            resultHeader.textContent = "Oh no! You were wrong!";
            resultBody.textContent = `The correct answer begins with ${clueCharacter}`;
            scoreboard.textContent = `You have one more chance!`;
            resultHeader.style.display = "block";
            resultBody.style.display = "block";
            document.getElementById("guess").focus();

        }
        else {
            resultHeader.textContent = "Oh no! You were wrong!";
            resultBody.textContent = `The correct answer was ${formattedName}`;
            scoreboard.textContent = `You've guessed correctly ${score} times`;
            resultHeader.style.display = "block";
            resultBody.style.display = "block";
            scoreboard.style.display = "block";
            document.getElementById("guess").value = "";
            document.getElementById("submit").style.display = "none";
            document.getElementById("guess").focus();
        }
    }
}

