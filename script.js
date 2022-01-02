const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const success_message = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message_el = document.getElementById("message");
const PlayAgainBtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();


function getRandomWord(){
    const words = ["javascript","java","python"];

    return words[Math.floor(Math.random() * words.length)];
}


function displayWord(){
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter =>  `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join("")}
    `;

    const w = word_el.innerText.replace(/\n/g,'')
    if(w === selectedWord){
        popup.style.display = "flex";
        success_message.innerText = "Kazandınız ...";
    }
}


function updateWrongLetters(){

    wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Hatalı harf</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}  
    `
    items.forEach((item,index) => {
        const errCount = wrongLetters.length;
        if(index< errCount){
            item.style.display = 'block';
        }
    })

    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        popup.style.color = "red"
        popup.innerText = "Kazanamadınız."
    }
}

PlayAgainBtn.addEventListener("click",function(){
  correctLetters.splice(0)
  wrongLetters.splice(0);
  selectedWord = getRandomWord()
  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';
})

window.addEventListener("keydown",function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){

        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                message_el.style.display = 'none';
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
})
displayWord()