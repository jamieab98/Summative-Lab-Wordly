const testBox = document.getElementById("testing-box");
const wordSubmit = document.getElementById("user-form");
const wordContainer = document.getElementById("word-container");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const favoriteButton = document.getElementById("favoriteButton");
const favoritesList = document.getElementById("favorites");
const pronunciationBox = document.getElementById("pronunciation");
const savedFavorites = [];
const errorMessage1 = "The word you have provided is invalid. Please provide a valid word"
const errorMessage2 = "You left the word field blank. Please provide a word";
const changeTheme = document.getElementById("change-display");
const pageBody = document.getElementById("page-body");
const mainHeading = document.getElementById("main-heading");
let currentTheme = "light";

wordSubmit.addEventListener("submit", (event) => {
    wordContainer.textContent = "";
    wordContainer.classList.remove('error');
    pronunciationBox.textContent = "";
    pronunciationBox.classList.remove('error');

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
                newListSynonym.textContent = `Synonym(s) of this form of the word: ${(meaning.synonyms).join(", ")}`;
                newListAntonym.textContent = `Antonym(s) of this form of the word: ${(meaning.antonyms).join(", ")}`;
                wordContainer.append(newMeaning);
                newMeaning.append(newListPOS, newListDef, newListExample, newListSynonym, newListAntonym);
            })
            if (data[0].phonetic == null) {
                pronunciationBox.textContent = "Something went wrong and a pronunciation cannot be found";
                pronunciationBox.classList.add('error');
            }
            else {
                pronunciationBox.textContent = data[0].phonetic;
            } 
            })
        .catch((error) => {
            if (error == "TypeError: Cannot read properties of undefined (reading 'meanings')") {
                wordContainer.textContent = "The word you have provided is invalid. Please provide a valid word";
                wordContainer.classList.add('error');
            }
            else if (error == `SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON`) {
                wordContainer.textContent = "You left the word field blank. Please provide a word";
                wordContainer.classList.add('error');
            }
            else {
                wordContainer.textContent = error;
                wordContainer.classList.add('error');
            }
        })
    event.preventDefault();
})

favoriteButton.addEventListener("click", () => {
    favoritesList.classList.remove('error');
    const savedWord = document.getElementById("user-word").value.toLowerCase();
    if (savedWord == "") {
        favoritesList.textContent = errorMessage1;
        favoritesList.classList.add('error');
    }
    else if(wordContainer.textContent == "The word you have provided is invalid. Please provide a valid word") {
        favoritesList.textContent = errorMessage2;  
        favoritesList.classList.add('error');      
    }
    else if(savedFavorites.includes(savedWord)) {
        favoritesList.textContent = "This word is already saved";
        favoritesList.classList.add('error');
    }
    else {
    savedFavorites.push(savedWord);
    favoritesList.textContent = savedFavorites.join(", ");                
    }
})

changeTheme.addEventListener("click", () => {
    //testBox.textContent = "button clicked";
    if (currentTheme == "light") {
        currentTheme = "dark";
        changeTheme.textContent = "Click for Light Mode";
        pageBody.classList.remove("light");
        pageBody.classList.add("dark");
        mainHeading.classList.remove("light");
        mainHeading.classList.add("dark");
    }
    else {
        currentTheme = "light"
        changeTheme.textContent = "Click for Dark Mode";
        pageBody.classList.remove("dark");
        pageBody.classList.add("light");
        mainHeading.classList.remove("dark");
        mainHeading.classList.add("light");
    }
})