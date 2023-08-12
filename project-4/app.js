/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 * - Add a toast message when copied
 */

const root = document.querySelector('#root');
const changeColorButton = document.querySelector('#change-btn');
const copyButton = document.querySelector('#copy-btn');
const output = document.querySelector('#output');
const toastMessage = document.createElement('div');

//Generating random numbers
const createRandomNumbers = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber.toString(16);
};

//Generating hex colors
const createHexColor = () => {
  const red = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  const green = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  const blue = createRandomNumbers(0, 255).toString(16).padStart(2, 0);
  return `#${red}${green}${blue}`;
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

//click event on change color button
changeColorButton.addEventListener('click', () => {
  const bgColor = createHexColor();
  root.style.backgroundColor = bgColor;
  output.value = bgColor;
  copyButton.textContent = 'copy';
  toastMessageDisappear();
});

/*
const html = `<button class="toast-message hide"> ${output.value} coppied!</button>`;
root.insertAdjacentHTML('afterBegin', html);
*/

//click event on color copy button
copyButton.addEventListener('click', () => {
  window.navigator.clipboard.writeText(output.value);
  copyButton.textContent = 'text copied';

  //toast message
  createToastMessage(output.value);
});

//click event on toast message element
toastMessage.addEventListener('click', toastMessageDisappear);

/*
// Globals
let div = null;

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
	});

	copyBtn.addEventListener('click', function () {
		navigator.clipboard.writeText(output.value);
		if (div !== null) {
			div.remove();
			div = null;
		}
		generateToastMessage(`${output.value} copied`);
	});
}

function generateHexColor() {
	// #000000 #ffffff
	// 255, 255, 255 -> #FFFFFF
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
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

*/
