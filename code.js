'use strict';

let values = [];
const keypad = document.querySelector('.keypad');
const screen = document.querySelector('.screen__container');
// 1- get all the inputs

// 2- when an input is registered, figure out which one it is

keypad.addEventListener('click', function (e) {
  const target = e.target.closest('.key');
  if (target) {
    // 3- build a string depending on the inputs
    const targetId = target.id;
    const keyName = targetId.split('-')[0];
    const keyValue = targetId.split('-')[1];
    // if the inputs are numbers, add them into the string
    if (keyName === 'number') {
      values.push(keyValue);
    }
    if (keyName === 'key') {
      if (keyValue === 'plus') values.push('+');
      if (keyValue === 'minus') values.push('-');
      if (keyValue === 'multiply') values.push('*');
      if (keyValue === 'devide') values.push('/');
    }
    // of if they are +, -, *, /, or . add them to the string too

    // if the input is delete, then delete the last caracter in the string
    // if the input is reset, then empty all the values
    // if the input is equals, then calculate the values in the string, then show the result in the screen
    console.log(values);
    screen.innerHTML = values.join('').replace('*', '×');
  }
});

// 4- calculate the values in the string using 'eval()' function
