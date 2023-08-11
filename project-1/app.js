'use strict';

const bgChangeButton = document.querySelector('#change-btn');
const autoChangeButton = document.querySelector('#change-btn-auto');
const autoStopButton = document.querySelector('#change-btn-auto-stop');
const root = document.querySelector('#root');
const colorText = document.querySelector('#text-color');
const createRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createRGBColor = () => {
  return `rgb(${createRandomNumbers(0, 255)},${createRandomNumbers(
    0,
    255
  )},${createRandomNumbers(0, 255)})`;
};

autoStopButton.style.display = 'none';

bgChangeButton.addEventListener('click', () => {
  const bgColor = createRGBColor();
  root.style.backgroundColor = bgColor;
  colorText.textContent = bgColor;
});

autoChangeButton.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    let bgColor = createRGBColor();
    root.style.backgroundColor = bgColor;
    colorText.textContent = bgColor;
    autoChangeButton.style.display = 'none';
    autoStopButton.style.display = 'block';
  }, 100);
  autoStopButton.addEventListener('click', () => {
    autoStopButton.style.display = 'none';
    autoChangeButton.style.display = 'block';
    clearInterval(intervalId);
  });
});

/*
window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');

  const btn = document.getElementById('change-btn');
  const autobtn = document.getElementById('change-btn-auto');
  const autobtnstop = document.getElementById('change-btn-auto-stop');

  let txtcolor = document.getElementById('text-color');

  autobtnstop.style.display = 'none';

  btn.addEventListener('click', function () {
    const bgColor = generateRGBColor();
    root.style.backgroundColor = bgColor;
    txtcolor.innerText = bgColor;
  });

  autobtn.addEventListener('click', function () {
    autobtn.style.display = 'none';
    autobtnstop.style.display = 'block';

    var intervalId = window.setInterval(function () {
      const bgColor = generateRGBColor();
      root.style.backgroundColor = bgColor;
      txtcolor.innerText = bgColor;
    }, 5000);

    autobtnstop.addEventListener('click', function () {
      autobtn.style.display = 'block';
      autobtnstop.style.display = 'none';

      clearInterval(intervalId);
    });
  });
}

function generateRGBColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

*/
