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
                const newListSynonym = document.createElement("li");
                const newListAntonym = document.createElement("li");
                newListPOS.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                newListDef.textContent = `Definition: ${meaning.definitions[0].definition}`;
                newListExample.textContent = `Example: ${meaning.definitions[0].example}`;
                if (meaning.definitions[0].example == undefined) {
                    newListExample.textContent = "There is no example sentence for this definition"
                }
                newListSynonym.textContent = `Synonym(s) of this form of the word: ${meaning.synonyms}`;
                newListAntonym.textContent = `Antonym(s) of this form of the word: ${meaning.antonyms}`;
                wordContainer.append(newMeaning);
                newMeaning.append(newListPOS, newListDef, newListExample, newListSynonym, newListAntonym);
            })
        })
        .catch(error => {
            wordContainer.textContent = error.message;
        })
    event.preventDefault();
})