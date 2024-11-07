let randomIndex = Math.floor(Math.random() * 150) + 1;
const wrongAnswers = [];
fetchWrong();
fetchData();


async function fetchWrong() {
    try {
        // APi call to fetch 150 pokemon for wrong answers
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`);
        // check if the response is ok
        if (!response.ok) {
            throw new Error("Failed to fetch wrong answers");
        }
        // parse response data
        const data = await response.json();
        incorrectData = data.results;
        console.log(incorrectData);
    }
    catch (error) {
        console.error(error);
    }
}


async function fetchData() {
    try {
        // generate a random number to select the pokemon

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`);
        // get the data
        if (!response.ok) {
            throw new Error("Pokemon failed to load");
        }
        const correctData = await response.json();
        const pokemonSprite = correctData.sprites.front_default;
        pokemonName = correctData.name;
        formattedName = correctData.name.charAt(0).toUpperCase() + correctData.name.slice(1);
        clueCharacter = formattedName.charAt(0);
        console.log(pokemonName);
    }
    // catch any errors
    catch (error) {
        console.error(error);
    }
}
