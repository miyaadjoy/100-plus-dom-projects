/**
 * Date: 17-8-2023
 * Author: Miyaad J
 * Description: Color picker application with huge dom functionalities
 */
const randomColorBtn = document.querySelector('#generate-random-color');
const colorDisplay = document.querySelector('#color-display');
const outputRGB = document.querySelector('#input-rgb');
const outputHex = document.querySelector('#input-hex');

const inputHex = document.querySelector('#input-hex');

const redColorSlider = document.querySelector('#color-slider-red');
const greenColorSlider = document.querySelector('#color-slider-green');
const blueColorSlider = document.querySelector('#color-slider-blue');
const copyToClipboardBtn = document.querySelector('#copy-to-clipboard');
const colorModes = document.getElementsByName('color-mode');
const toastMessage = document.createElement('div');

const redColorSliderLabel = document.querySelector('#color-slider-red-label');
const greenColorSliderLabel = document.querySelector(
  '#color-slider-green-label'
);
const blueColorSliderLabel = document.querySelector('#color-slider-blue-label');

//change display color
const changeDisplayColor = color => {
  colorDisplay.style.backgroundColor = color;
};

//adjust RGB Sliders
const adjustRGBSliders = (r, g, b) => {
  redColorSlider.value = r;
  redColorSliderLabel.textContent = `${r}`;
  greenColorSlider.value = g;
  greenColorSliderLabel.textContent = `${g}`;
  blueColorSlider.value = b;
  blueColorSliderLabel.textContent = `${b}`;
};

//Adjust RGB colors from color slider
const adjustRGBColors = (redColorSlider, greenColorSlider, blueColorSlider) => {
  console.log(redColorSlider, greenColorSlider, blueColorSlider);
  const color = `rgb(${redColorSlider}, ${greenColorSlider}, ${blueColorSlider})`;
  //change display color
  changeDisplayColor(color);
  //showing RGB color on output
  outputRGB.value = color;
  //showing Hex color on output
};

//Adjust Hex colors from color slider
const adjustHexColors = (r, g, b) => {
  console.log(r, g, b);
  const red = Number(r).toString(16).padStart(2, 0);
  const green = Number(g).toString(16).padStart(2, 0);
  const blue = Number(b).toString(16).padStart(2, 0);
  console.log(red, green, blue);
  outputHex.value = `${red.toUpperCase()}${green.toUpperCase()}${blue.toUpperCase()}`;
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
const createToastMessage = (message, mode) => {
  if (mode === 'hex' && isValidHex(message)) {
    window.navigator.clipboard.writeText(`#${message}`);
    toastMessage.textContent = `#${message} copied!`;
    toastMessage.classList.add('toast-message');
    document.querySelector('.container').prepend(toastMessage);
    toastMessageAppear();
  } else if (mode === 'rgb') {
    window.navigator.clipboard.writeText(`#${message}`);
    toastMessage.textContent = `${message} copied!`;
    toastMessage.classList.add('toast-message');
    document.querySelector('.container').prepend(toastMessage);
    toastMessageAppear();
  } else {
    alert('Invalid Color Code!');
  }
};

redColorSlider.addEventListener('change', e => {
  redColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
  adjustHexColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
});

greenColorSlider.addEventListener('change', e => {
  greenColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
  adjustHexColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
});

blueColorSlider.addEventListener('change', e => {
  blueColorSliderLabel.textContent = e.target.value;
  adjustRGBColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
  adjustHexColors(
    redColorSlider.value,
    greenColorSlider.value,
    blueColorSlider.value
  );
});

//check for valid Hex color code

/**
 *
 * @param {string} code
 */
const isValidHex = code => {
  if (code.length !== 6) return false;
  if (code[0] === '#') return false;
  return /^[0-9A-Fa-f]{6}$/i.test(code);
};

//input Hex color value

inputHex.addEventListener('keyup', e => {
  const color = e.target.value;
  if (color) {
    if (isValidHex(color)) {
      changeDisplayColor(`#${color}`);
      //adjust RGB color
      const r = parseInt(color.slice(0, 2), 16);
      const g = parseInt(color.slice(2, 4), 16);
      const b = parseInt(color.slice(4), 16);
      console.log(r, g, b);
      adjustRGBColors(r, g, b);
      //adjust rgb sliders
      adjustRGBSliders(r, g, b);
    }
    outputHex.value = color.toUpperCase();
  }
});

//copy colors to clipboard
copyToClipboardBtn.addEventListener('click', () => {
  const colorMode = colorModes[0].checked ? 'hex' : 'rgb';
  console.log(colorMode);
  if (colorMode === 'hex') {
    createToastMessage(outputHex.value, colorMode);
  } else {
    createToastMessage(outputRGB.value, colorMode);
  }
});

//make the toast message disappear
toastMessage.addEventListener('click', toastMessageDisappear);

//creating random colors
//Generating random numbers
const createRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//creating random decimals for rgb colors
const createColors = () => {
  const red = createRandomNumbers(0, 255);
  const green = createRandomNumbers(0, 255);
  const blue = createRandomNumbers(0, 255);
  return [red, green, blue];
};

//random color click event
randomColorBtn.addEventListener('click', () => {
  const [red, green, blue] = createColors();
  //change display color
  const color = `rgb(${red},${green},${blue})`;
  changeDisplayColor(color);
  adjustHexColors(red, green, blue);
  adjustRGBColors(red, green, blue);
  adjustRGBSliders(red, green, blue);
  toastMessageDisappear();
});

/*

let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

// onload handler
window.onload = () => {
  main();
  updateColorCodeToDom(defaultColor);
};

// main or boot function, this function will take care of getting all the DOM references
function main() {
  // dom references
  const generateRandomColorBtn = document.getElementById(
    'generate-random-color'
  );
  const colorModeHexInp = document.getElementById('input-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');
  const copyToClipboardBtn = document.getElementById('copy-to-clipboard');

  // event listeners
  generateRandomColorBtn.addEventListener(
    'click',
    handleGenerateRandomColorBtn
  );
  colorModeHexInp.addEventListener('keyup', handleColorModeHexInp);
  colorSliderRed.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderGreen.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );
  colorSliderBlue.addEventListener(
    'change',
    handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
  );

  copyToClipboardBtn.addEventListener('click', handleCopyToClipboard);
}

// event handlers
function handleGenerateRandomColorBtn() {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
}

function handleColorModeHexInp(e) {
  const hexColor = e.target.value;
  if (hexColor) {
    this.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
}

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  };
}

function handleCopyToClipboard() {
  const colorModeRadios = document.getElementsByName('color-mode');
  const mode = getCheckedValueFromRadios(colorModeRadios);
  console.log(mode);
  if (mode === null) {
    throw new Error('Invalid Radio Input');
  }

  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }

  if (mode === 'hex') {
    const hexColor = document.getElementById('input-hex').value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor} Copied`);
    } else {
      alert('Invalid Hex Code');
    }
  } else {
    const rgbColor = document.getElementById('input-rgb').value;
    if (rgbColor) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(`${rgbColor} Copied`);
    } else {
      alert('Invalid RGB Color');
    }
  }
}

// DOM functions
/**
 * Generate a dynamic DOM element to show a toast message
 * @param {string} msg
 */
/*
function generateToastMessage(msg) {
  toastContainer = document.createElement('div');
  toastContainer.innerText = msg;
  toastContainer.className = 'toast-message toast-message-slide-in';

  toastContainer.addEventListener('click', function () {
    toastContainer.classList.remove('toast-message-slide-in');
    toastContainer.classList.add('toast-message-slide-out');

    toastContainer.addEventListener('animationend', function () {
      toastContainer.remove();
      toastContainer = null;
    });
  });

  document.body.appendChild(toastContainer);
}

/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */
/*
function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}

/**
 * update dom elements with calculated color values
 * @param {object} color : ;
 */
/*
function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);

  document.getElementById(
    'color-display'
  ).style.backgroundColor = `#${hexColor}`;
  document.getElementById('input-hex').value = hexColor;
  document.getElementById('input-rgb').value = rgbColor;
  document.getElementById('color-slider-red').value = color.red;
  document.getElementById('color-slider-red-label').innerText = color.red;
  document.getElementById('color-slider-green').value = color.green;
  document.getElementById('color-slider-green-label').innerText = color.green;
  document.getElementById('color-slider-blue').value = color.blue;
  document.getElementById('color-slider-blue-label').innerText = color.blue;
}

// Utils

/**
 * generate and return an object of three color decimal values
 * @returns {object}}
 */
/*
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

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
/*
function generateHexColor({ red, green, blue }) {
  const getTwoCode = value => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */
/*
function generateRGBColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * convert hex color to decimal colors object
 * @param {string} hex
 * @returns {object}
 */
/*function hexToDecimalColors(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return {
    red,
    green,
    blue,
  };
}

/**
 * validate hex color code
 * @param {string} color;
 * @returns {boolean}
 */
/*
function isValidHex(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

*/
