/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 */

const root = document.querySelector('#root');
const changeColorButton = document.querySelector('#change-btn');
const copyButton = document.querySelector('#copy-btn');
const output = document.querySelector('#output');

const createRandomNumbers = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber.toString(16);
};

const createHexColor = () => {
  const red = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  const green = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  const blue = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  console.log(red, green, blue);
  return `#${red}${green}${blue}`;
};

changeColorButton.addEventListener('click', () => {
  const bgColor = createHexColor();
  console.log(bgColor);
  root.style.backgroundColor = bgColor;
  output.value = bgColor;
  copyButton.textContent = 'copy';
});

copyButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(output.value);
  copyButton.textContent = 'text copied';
});
/*
window.onload = () => {
	main();
};

function main() {
	const root = document.getElementById('root');
	const output = document.getElementById('output');
	const changeBtn = document.getElementById('change-btn');
	const copyBtn = document.getElementById('copy-btn');

	changeBtn.addEventListener('click', function () {
		const bgColor = generateHexColor();
		root.style.backgroundColor = bgColor;
		output.value = bgColor;
		copyBtn.innerHTML = "Copy";
	});

	copyBtn.addEventListener('click', function () {
		navigator.clipboard.writeText(output.value);
		copyBtn.innerHTML = "Code Copied";
	});
}

// step 2 - random color generator function
function generateHexColor() {
	// #000000 #ffffff
	// 255, 255, 255 -> #FFFFFF
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
*/
