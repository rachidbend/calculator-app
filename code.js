'use strict';
// my code
/*
let values = [];
let result = '';
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

    // if the input is a key, do something depending on the key
    if (keyName === 'key') {
      // if the last input was a key, do not allow the use of a key until the user inputs a number first
      if (
        (keyValue === 'plus' ||
          keyValue === 'minus' ||
          keyValue === 'multiply' ||
          keyValue === 'devide' ||
          keyValue === 'dot') &&
        (values[values.length - 1] === '+' ||
          values[values.length - 1] === '-' ||
          values[values.length - 1] === '*' ||
          values[values.length - 1] === '/' ||
          values[values.length - 1] === '.' ||
          values[values.length - 1] === '×')
      ) {
        return;
      }
      if (keyValue === 'plus') values.push('+');
      if (keyValue === 'minus') values.push('-');
      if (keyValue === 'multiply') values.push('*');
      if (keyValue === 'devide') values.push('/');
      if (keyValue === 'dot') values.push('.');
      // if the input is equals, then calculate the values in the string, then show the result in the screen
      if (keyValue === 'equals') {
        result = calculate(values.join(''));
        values = [result];
      }
      // if the input is reset, then empty all the values
      if (keyValue === 'reset') {
        result = 0;
        values = [];
      }
      // if the input is delete, then delete the last caracter in the string
      if (keyValue === 'delete') {
        values.pop();
      }
    }
    // of if they are +, -, *, /, or . add them to the string too

    // display the result

    screen.innerHTML = values.join('').replace('*', '×');
  }
});

// 4- calculate the values in the string using 'eval()' function

function calculate(string) {
  // calculate the operations in the string
  let value = eval?.(string);
  const newValue = `${value}`.split('.');
  // if the resulting value is a decimal, then fix it to 2 decimal points
  // if the resulting value is not a decimal, then just return it as normal
  if (newValue?.at(1)) value = value.toFixed(2);

  // if there was an error, return the string error, stop all opirations other than reset

  return value;
}
*/

// code using Pieces

// used to track all the numbers and operators inputed by the user
let values = [];

// used to get the calculated result when the user clicks on equals key
let result = '';

// flag used to track if any error is returned
let isError = false;

// refrences to the keypad and screen element
const keypad = document.querySelector('.keypad');
const screen = document.querySelector('.screen__container');

// Map for key operations
const keyOperations = {
  plus: '+',
  minus: '-',
  multiply: '*',
  devide: '/',
  dot: '.',
  equals: '=',
  reset: 'reset',
  delete: 'delete',
};

// add event listener to the keypad for click events
keypad.addEventListener('click', function (e) {
  // get the closest element with the class 'key'
  const target = e.target.closest('.key');
  if (target) {
    // split the target id to get the key name and value
    const [keyName, keyValue] = target.id.split('-');

    // if an error has occured, only allow reset
    if (isError && keyValue !== 'reset') return;

    // if the key is a number, add it to the values array
    if (keyName === 'number') {
      values.push(keyValue);
    } else if (keyName === 'key') {
      // get the last value in the values array
      const lastValue = values[values.length - 1];
      // get the corresponding operation from the keyOperations map
      const operation = keyOperations[keyValue];

      // prevent consecutive operators or dots
      if (
        ['+', '-', '*', '/', '.', '×'].includes(operation) &&
        ['+', '-', '*', '/', '.', '×'].includes(lastValue)
      ) {
        return;
      }
      // prevent multiple dots in a single number
      if (keyValue === 'dot') {
        const lastNumber = values
          .join('')
          .split(/[\+\-\*\/×]/)
          .pop();
        if (lastNumber.includes('.')) return;
      }

      // handle different key operations
      switch (keyValue) {
        case 'plus':
        case 'minus':
        case 'multiply':
        case 'devide':
        case 'dot':
          values.push(operation);
          break;
        case 'equals':
          // calculate the result and update the values array
          result = calculate(values.join(''));
          values = [result];
          break;
        case 'reset':
          // reset the result, error state, and values array
          result = 0;
          isError = false;
          values = [];
          break;

        case 'delete':
          // remove the last value from vamues array
          values.pop();
          break;
      }
    }

    // Display the result on the screen
    screen.innerHTML = values.join('').replace('*', '×');
  }
});

// function to calculate the result from the input string
function calculate(string) {
  try {
    // evaluate the string as a mathematical expression
    let value = eval?.(string);
    const [integerPart, decimalPart] = `${value}`.split('.');
    // if the result is a decimal, fix it to 2 decimal points
    // if not, return the value unedited
    if (decimalPart) value = value.toFixed(2);
    return value;
  } catch (error) {
    // if there's an error, set the error flag and return 'Error' to be displayed in the screen
    isError = true;
    return 'Error';
  }
}
