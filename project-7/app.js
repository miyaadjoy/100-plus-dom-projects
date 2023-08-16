/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 * - User can type their own hex code too
 * - show rgb color too, but do not need to edit it
 * - user can also copy the rgb color code
 */

const root = document.querySelector('#root');
const changeColorButton = document.querySelector('#change-btn');
const hexCoppyButton = document.querySelector('#copy-btn');
const RGBCoppyButton = document.querySelector('#copy-btn2');
const hexOutput = document.querySelector('#output');
const RGBOutput = document.querySelector('#output2');
const toastMessage = document.createElement('div');

//Generating random numbers
const createRandomNumbers = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

//creating random decimals for rgb colors
const createColors = () => {
  const red = createRandomNumbers(0, 255);
  const green = createRandomNumbers(0, 255);
  const blue = createRandomNumbers(0, 255);
  return [red, green, blue];
};

//Generating hex colors
const createHexColor = (r, g, b) => {
  const red = r.toString(16).toUpperCase().padStart(2, 0);
  const green = g.toString(16).toUpperCase().padStart(2, 0);
  const blue = b.toString(16).toUpperCase().padStart(2, 0);

  return `#${red}${green}${blue}`;
};

//Generating rgb colors
const createRGBColor = (red, green, blue) => {
  return `rgb(${red},${green},${blue})`;
};
//toast message appear animation
const toastMessageAppear = () => {
  toastMessage.classList.remove('slide-out');
  toastMessage.classList.add('slide-in');
};
//toast message disappear animation
const toastMessageDisappear = () => {
  toastMessage.classList.remove('slide-in');
  toastMessage.classList.add('slide-out');
};
//creating the toast message
const createToastMessage = message => {
  toastMessage.textContent = `${message} coppied!`;
  toastMessage.classList.add('toast-message');
  root.prepend(toastMessage);

  toastMessageAppear();
};

//change background color
const changeBackgroundColor = color => {
  root.style.backgroundColor = color;
  toastMessageDisappear();
};

//change hex output
const changeHexOutput = color => {
  hexOutput.value = color.slice(1);
};
//change rgb output
const changeRGBOutput = color => {
  RGBOutput.value = color;
};

//hex code validation
/**
 *
 * @param {string} color
 * @returns
 */
const isValidHex = color => {
  if (color.length !== 6) return false;
  if (color[0] === '#') return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color); //RegExp(Regular expression);
};

//click event on change color button
changeColorButton.addEventListener('click', () => {
  const [r, g, b] = createColors();

  changeHexOutput(createHexColor(r, g, b));
  changeRGBOutput(createRGBColor(r, g, b));
  //changing background color
  changeBackgroundColor(createHexColor(r, g, b));
});

/*
const html = `<button class="toast-message hide"> ${hexOutput.value} coppied!</button>`;
root.insertAdjacentHTML('afterBegin', html);
*/

//click event on hex color copy button
hexCoppyButton.addEventListener('click', () => {
  if (isValidHex(hexOutput.value)) {
    window.navigator.clipboard.writeText(hexOutput.value);
    //toast message
    createToastMessage(`#${hexOutput.value}`);
  } else alert('Invalid hex code');
});

//click event on rgb color copy button
RGBCoppyButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(RGBOutput.value);
  //toast message
  createToastMessage(RGBOutput.value);
});

//click event on toast message element
toastMessage.addEventListener('click', toastMessageDisappear);

//keyup event on color input
hexOutput.addEventListener('keyup', e => {
  const color = e.target.value;
  if (color) {
    if (isValidHex(color)) changeBackgroundColor('#' + color);
    hexOutput.value = color.toUpperCase();
  }
});

/*
let div = null;

window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const output = document.getElementById('output');
  const output2 = document.getElementById('output2');
  const changeBtn = document.getElementById('change-btn');
  const copyBtn = document.getElementById('copy-btn');

  changeBtn.addEventListener('click', function () {
    const color = generateColorDecimal();
    const hex = generateHexColor(color);
    const rgb = generateRGBColor(color);
    root.style.backgroundColor = hex;
    output.value = hex.substring(1);
    output2.value = rgb;
  });

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(`#${output.value}`);
    if (div !== null) {
      div.remove();
      div = null;
    }
    if (isValidHex(output.value)) {
      generateToastMessage(`#${output.value} copied`);
    } else {
      alert('Invalid Color Code');
    }
  });

  output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color) {
      output.value = color.toUpperCase();
      if (isValidHex(color)) {
        root.style.backgroundColor = `#${color}`;
      }
    }
  });
}

function generateColorDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
}

function generateHexColor({ red, green, blue }) {
  const getTwoCode = value => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateToastMessage(msg) {
  div = document.createElement('div');
  div.innerText = msg;
  div.className = 'toast-message toast-message-slide-in';

  div.addEventListener('click', function () {
    div.classList.remove('toast-message-slide-in');
    div.classList.add('toast-message-slide-out');

    div.addEventListener('animationend', function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}

/**
 * @param {string} color : ;
 */
/*
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

*/
