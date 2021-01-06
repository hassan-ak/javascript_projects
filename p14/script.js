// Dom Elemnts
const main = document.getElementById('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const customTextDiv = document.getElementById('custom-text');

// Data
const data = [
    {   image: './img/angry.jpg',   text: "I'm Angry"  },
    {   image: './img/drink.jpg',   text: "I'm Thirsty"},
    {   image: './img/food.jpg',    text: "I'm Hungry" },
    {   image: './img/grandma.jpg', text: "I want to go to Grandma's"},
    {   image: './img/happy.jpg',   text: "I'm Happy"},
    {   image: './img/home.jpg',    text: "I Want to go Home"},
    {   image: './img/hurt.jpg',    text: "I'm Hurt"},
    {   image: './img/outside.jpg', text: "I Want to go Outside"},
    {   image: './img/sad.jpg',     text: "I'm Sad"},
    {   image: './img/scared.jpg',  text: "I'm Scared"},
    {   image: './img/school.jpg',  text: "I Want to go to School"},
    {   image: './img/tired.jpg',   text: "I'm Tired"}
]

// Array for all Web Speech API Voices
 let voicesBackup = [];

// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. create speech boxes
function createBox(imageObj) {
    const box = document.createElement('div');
    const { image, text } = imageObj;
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    main.appendChild(box);
}

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

// 2. get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
}

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice(e) {
    console.log(e.target.value);
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}
  
// Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event Listeners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

// 3. Event Listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

// 4. Event Listener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})