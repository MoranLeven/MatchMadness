// import { words } from "./words.js";
let input;
let output;
let lastInput;
let lastOutput;
let score = 0;
const inputs = document.querySelectorAll(".input");
const outputs = document.querySelectorAll(".output");
const points = document.querySelector(".score");
const wordsKeys = Object.keys(words);
const wordUpdater = document.querySelector(".words-updater");
function selectInput() {
  if (!this.value) return;
  //handling the selection of input
  if (lastInput && lastInput != this) {
    lastInput.classList.remove("input_selected");
  }

  input =
    lastInput && input === this.value
      ? undefined
      : this.value === ""
      ? undefined
      : this.value;
  lastInput = this;

  this.classList.toggle("input_selected");

  console.log(input);
}

function selectOutput() {
  if (!this.value) return;
  //handling the input

  //handling the selection of output
  if (lastOutput && this != lastOutput) {
    lastOutput.classList.remove("output_selected");
  }

  this.classList.toggle("output_selected");

  output =
    lastOutput && output === this.value
      ? undefined
      : this.value === ""
      ? undefined
      : this.value;

  lastOutput = this;
  console.log(output);
}

function checkResult() {
  let result = false;
  if (input && output) {
    if (words[input] === output) {
      score += 1;
      console.log("🥳🥳Correct✔️");
      result = true;
    } else {
      score -= 1;
      console.log("😖😖Incorrect❌");
    }

    //lets remove the selection
    setTimeout(() => {
      lastInput.classList.remove("input_selected");
      lastOutput.classList.remove("output_selected");
      input = undefined;
      output = undefined;
      // if (result) {
      //   updateWords();
      // }
    }, 400);

    updateScore(score);
  }
}

function updateScore(score) {
  points.value = score;
  points.classList.add("score-updated");
}

function updateWords() {
  let word = randomWord();
  lastInput.value = word;
  lastOutput.value = words[word];
}

function randomWord() {
  let len = wordsKeys.length - 1;
  return wordsKeys[Math.floor(Math.random() * len)];
}

function fillWords() {
  console.log("filling the words");
  const ints = new Set();
  const outs = new Set();
  const wrds = new Set();
  //lets take five words out of the wordsKeys list
  while (wrds.size < 5) {
    wrds.add(randomWord());
  }

  while (ints.size < 5) {
    ints.add(Math.floor(Math.random() * 5));
  }

  while (outs.size < 5) {
    outs.add(Math.floor(Math.random() * 5));
  }

  //lets do the filling part
  var int, out, word;
  for (var i = 0; i < 5; i++) {
    int = Array.from(ints)[i];
    out = Array.from(outs)[i];
    word = Array.from(wrds)[i];
    inputs[int].value = word;
    outputs[out].value = words[word];
  }
}

inputs.forEach((iput) => {
  iput.addEventListener("click", selectInput);
  iput.addEventListener("click", checkResult);
});

outputs.forEach((oput) => {
  oput.addEventListener("click", selectOutput);
  oput.addEventListener("click", checkResult);
});

wordUpdater.addEventListener("click", fillWords);
