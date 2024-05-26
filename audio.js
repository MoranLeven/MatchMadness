const wordMsg = new SpeechSynthesisUtterance();
const ins = document.querySelectorAll(".input");
const outs = document.querySelectorAll(".output");
const silent = document.querySelector("mute");
let muteIt = true;
let spanish_voice;
let english_voice;

function mute() {
  wordMsg.volume = muteIt ? 0 : 1;
  console.log(`Mute === ${muteIt}🔇🔊`);
  document.querySelector(".mute").innerText = muteIt ? "🔊 UnMute" : "🔇Mute";
  muteIt = !muteIt;
}
function populateVoices() {
  let voices = speechSynthesis.getVoices();
  spanish_voice = voices.find((ele) => ele.lang === "es-US");
  english_voice = voices.find((ele) => ele.lang === "en-US");
}
function pronounceInput() {
  //start with canceling the voice
  speechSynthesis.cancel();
  wordMsg.text = this.value;
  wordMsg.rate = wordMsg.text.length > 10 ? 2 : 1;

  wordMsg.voice = spanish_voice;
  speechSynthesis.speak(wordMsg);
}

function pronounceOutput() {
  speechSynthesis.cancel();
  wordMsg.text = this.value;
  wordMsg.rate = wordMsg.text.length > 10 ? 3 : 1;
  wordMsg.voice = english_voice;
  console.log(speechSynthesis.pending);
  speechSynthesis.speak(wordMsg);
  console.log(speechSynthesis.pending);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
//add the event listener here
ins.forEach((i) => {
  i.addEventListener("click", pronounceInput);
});

outs.forEach((o) => {
  o.addEventListener("click", pronounceOutput);
});
