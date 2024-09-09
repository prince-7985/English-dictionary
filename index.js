const inputelement = document.getElementById("input");
const infotext = document.getElementById("info-text");
const meaningelement = document.querySelector(".meaning-container");
const title = document.getElementById('title');
const meaning = document.getElementById('meaning');
const audioElement = document.getElementById('audio'); 

async function fetchAPI(word) {
    try {
        // Show that we are searching for the meaning
        infotext.innerText = `Searching for the meaning of "${word}"...`;
        infotext.style.display = "block";  // Show the info text
        meaningelement.style.display = "none";  // Hide the meaning container while searching

    
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        
        if (result && result[0] && result[0].meanings) {
            // Now that we have the result, update the UI
            title.innerText = result[0].word;
            meaning.innerText = result[0].meanings[0].definitions[0].definition;

            // Check if phonetics and audio exist
            if (result[0].phonetics && result[0].phonetics[0].audio) {
                // Set the audio source
                audioElement.src = result[0].phonetics[0].audio;
                audioElement.style.display = "block";  // Show the audio control
            } else {
                audioElement.style.display = "none";  // Hide if no audio is available
            }

            meaningelement.style.display = "block";  // Show the meaning container with the data
            infotext.style.display = "none";  // Hide the "searching" text
        } else {
            // Handle case where no meaning is found
            infotext.innerText = `No meaning found for "${word}"`;
            audioElement.style.display = "none";
        }
    } catch (error) {
        console.log(error);
        infotext.innerText = `Error: Could not fetch meaning for "${word}". Please try again.`;
        audioElement.style.display = "none";  // Hide audio control in case of error
    }
}

inputelement.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});
