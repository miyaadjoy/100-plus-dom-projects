//Project - 11

//HTML Elements
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
const saveCustomColorBtn = document.querySelector('#save-to-custom');

//GLOBAL Variables
//preset colors
const defaultPresetColors = [
  '#ffcdd2',
  '#f8bbd0',
  '#e1bee7',
  '#ff8a80',
  '#ff80ab',
  '#ea80fc',
  '#b39ddb',
  '#9fa8da',
  '#90caf9',
  '#b388ff',
  '#8c9eff',
  '#82b1ff',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#80d8ff',
  '#84ffff',
  '#a7ffeb',
  '#c8e6c9',
  '#dcedc8',
  '#f0f4c3',
  '#b9f6ca',
  '#ccff90',
  '#ffcc80',
];

//functions
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
  const color = `rgb(${redColorSlider}, ${greenColorSlider}, ${blueColorSlider})`;
  //change display color
  changeDisplayColor(color);
  //showing RGB color on output
  outputRGB.value = color;
  //showing Hex color on output
};

//Adjust Hex colors from color slider
const adjustHexColors = (r, g, b) => {
  const red = Number(r).toString(16).padStart(2, 0);
  const green = Number(g).toString(16).padStart(2, 0);
  const blue = Number(b).toString(16).padStart(2, 0);
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

const showToastMessage = (message, mode) => {
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

//creating new divs for all the color boxes
const createColorBox = function (color) {
  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.setAttribute('data-color', color);
  colorBox.style.backgroundColor = color;
  return colorBox;
};

//insert all the color boxes
const insertColorBoxes = function (parent, colors) {
  colors.forEach(color => {
    parent.append(createColorBox(color));
  });
};

//calling the insertColorBoxes function
const parent = document.querySelector('#preset-colors');
insertColorBoxes(parent, defaultPresetColors);

//event listener functions
//red color slider
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
//green color slider
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
//blue color slider
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
  if (colorMode === 'hex') {
    showToastMessage(outputHex.value, colorMode);
  } else {
    showToastMessage(outputRGB.value, colorMode);
  }
});

//make the toast message disappear
toastMessage.addEventListener('click', toastMessageDisappear);

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

//click event on the color box's parent
document.querySelector('#preset-colors').addEventListener('click', e => {
  if (e.target.classList.contains('color-box')) {
    //copy the color code
    const copyColor = e.target.getAttribute('data-color');
    window.navigator.clipboard.writeText(copyColor);
    //show toast message
    showToastMessage(copyColor.slice(1), 'hex');
    //play sound
    const copySound = new Audio('copy-sound.wav');
    copySound.volume = 0.2;
    copySound.play();
  }
});

//save custom color on click event
saveCustomColorBtn.addEventListener('click', () => {
  const customColor = `#${outputHex.value}`;
  const parent = document.querySelector('#custom-colors');
  createColorBox(customColor);
  insertColorBoxes(parent, [customColor]);
});
