const testBox=document.getElementById("testing-box");
const wordSubmit=document.getElementById("user-form");
const wordContainer=document.getElementById("word-container");
const url="https://api.dictionaryapi.dev/api/v2/entries/en/";

wordSubmit.addEventListener("submit", (event) => {
    const userWord=document.getElementById("user-word").value
    fetch(`${url}${userWord}`)
        .then(res => res.json())
        .then(data => {
            const numberOfMeanings = data[0].meanings;
            //wordContainer.textContent = numberOfMeanings;
            numberOfMeanings.forEach((meaning) => {
                const newListItem = document.createElement("li");
                newListItem.textContent = meaning.partOfSpeech;
                wordContainer.appendChild(newListItem);
            })
        })
    event.preventDefault();
})