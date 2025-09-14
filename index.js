const testBox = document.getElementById("testing-box");
const wordSubmit = document.getElementById("user-form");
const wordContainer = document.getElementById("word-container");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

wordSubmit.addEventListener("submit", (event) => {
    wordContainer.textContent="";
    const userWord = document.getElementById("user-word").value
    fetch(`${url}${userWord}`)
        .then(res => res.json())
        .then(data => {
            const numberOfMeanings = data[0].meanings;
            numberOfMeanings.forEach((meaning) => {
                const newMeaning = document.createElement("ul");
                const newListPOS = document.createElement("li");
                const newListDef = document.createElement("li");
                const newListExample = document.createElement("li");
                newListPOS.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                newListDef.textContent = `Definition: ${meaning.definitions[0].definition}`;
                newListExample.textContent = `Example: ${meaning.definitions[0].example}`;
                if (meaning.definitions[0].example == undefined) {
                    newListExample.textContent = "There is no example sentence for this definition"
                }
                wordContainer.append(newMeaning);
                newMeaning.append(newListPOS, newListDef, newListExample);
            })
            /*const synonymHeading = document.createElement("h3");
            synonymHeading.textContent = "List of Synonyms";
            wordContainer.append(synonymHeading);
            const synonymList = document.createElement("ul");
            const synonyms = data[0].meanings[1].synonyms;
            synonyms.forEach((synonym) => {
                const newSynonym = document.createElement("li");
                newSynonym.textContent = synonym;
                wordContainer.append(synonymList);
                synonymList.append(newSynonym);
            })
            const antonymHeading = document.createElement("h3");
            antonymHeading.textContent = "List of Antonyms";
            wordContainer.append(antonymHeading);
            const antonymList = document.createElement("ul");
            const antonyms = data[0].meanings[1].antonyms;
            antonyms.forEach((antonym) => {
                const newAntonym = document.createElement("li");
                newAntonym.textContent = antonym;
                wordContainer.append(antonymList);
                antonymList.append(newAntonym);
            })*/
        })
        .catch(error => {
            wordContainer.textContent = error.message;
        })
    event.preventDefault();
})