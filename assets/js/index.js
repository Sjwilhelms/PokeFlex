
// const start = document.getElementById("start");
const gameBanner = document.getElementById("gameBanner");
const gameContainer = document.getElementById("gameContainer");

score = 0;

/** start the game, close the introduction and fetch a pokemon */
function start() {
    gameBanner.classList.add("hide");
    gameContainer.classList.remove("hide");
    document.getElementById("guess").focus();
}
// call the function when the page loads
fetchData();
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
// add event listener for enter key to  submit form
document.addEventListener("keydown", event => {
    if (event.key.startsWith("Enter")) {
        getGuess();
    }
})
// add event listener for right arrow key to fetch a new pokemon
document.addEventListener("keydown", event => {
    if (event.key.startsWith("ArrowRight")) {
        fetchData();
    }
})
// add event listener for left arrow key to clear the text input
document.addEventListener("keydown", event => {
    if (event.key.startsWith("ArrowLeft")) {
        clearGuess();
    }
})
function clearGuess(){
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

