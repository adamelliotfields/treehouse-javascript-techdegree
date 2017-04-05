/* global drops */

// DOM elements
const name = document.getElementById('name');
const email = document.getElementById('mail');
const title = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const payPal = document.getElementsByTagName('fieldset')[3].children[4];
const bitcoin = document.getElementsByTagName('fieldset')[3].children[5];
const design = document.getElementById('design');
const color = document.getElementById('color');
const activities = document.getElementsByClassName('activities')[0];

// Set default state on DOM load
document.addEventListener('DOMContentLoaded', () => {
  name.focus();
  otherTitle.style.display = 'none';
  payment.value = 'credit card';
  payPal.style.display = 'none';
  bitcoin.style.display = 'none';
  color.style.display = 'none';
  color.previousElementSibling.style.display = 'none';
});

// Toggle text input field on "other" title select
title.addEventListener('change', () => {
  if (title.value === 'other') {
    otherTitle.style.display = 'inline-block';
  } else {
    otherTitle.style.display = 'none';
  }
});

// Show only t-shirt colors matching design theme
design.addEventListener('change', () => {
  if (design.value === 'js puns') {
    color.previousElementSibling.style.display = 'block';
    color.style.display = 'inline-block';
    [3, 4, 5].forEach((item) => {
      color.children[item].style.display = 'none';
    });
    [0, 1, 2].forEach((item) => {
      color.children[item].style.display = 'inline-block';
    });
    color.selectedIndex = 0;
  }
  if (design.value === 'heart js') {
    color.previousElementSibling.style.display = 'block';
    color.style.display = 'inline-block';
    [0, 1, 2].forEach((item) => {
      color.children[item].style.display = 'none';
    });
    [3, 4, 5].forEach((item) => {
      color.children[item].style.display = 'inline-block';
    });
    color.selectedIndex = 3;
  }
  if (design.value === 'Select Theme') {
    color.previousElementSibling.style.display = 'none';
    color.style.display = 'none';
  }
});

// Verify at least one activity is checked
const checked = () => {
  if (Array.from(document.querySelectorAll('input[type="checkbox"]')).some((item) => item.checked)) {
    return true;
  } else {
    return false;
  }
};

// Activities change handler
const registration = { all: 200, 'js-frameworks': 100, 'js-libs': 100, express: 100, node: 100, 'build-tools': 100, npm: 100 };
let total = 0;
activities.addEventListener('change', (event) => {
  // add/subtract total cost
  if (event.target.checked) {
    total += registration[event.target.name];
  } else {
    total -= registration[event.target.name];
  }
  // add/remove total h3
  const h3 = activities.lastElementChild;
  if (h3.tagName !== 'H3' && total !== 0) {
    activities.insertAdjacentHTML('beforeend', `<h3>Total: $${total}</h3>`);
  } else {
    h3.remove();
  }
  // update total cost
  if (h3.tagName === 'H3' && total !== 0) {
    h3.remove();
    activities.insertAdjacentHTML('beforeend', `<h3>Total: $${total}</h3>`);
  }
  // add/remove notification
  if (checked()) {
    drops.activities.close();
  } else {
    drops.activities.open();
  }
  // disable/enable conflicting activities
  const label = activities.children;
  // JavaScript Frameworks Workshop
  if (label[2].children[0].checked) {
    label[4].children[0].disabled = true;
    label[4].style.color = '#636c72';
    label[6].children[0].disabled = true;
    label[6].style.color = '#636c72';
    return;
  } else {
    label[4].children[0].disabled = false;
    label[4].style.color = '#000';
    label[6].children[0].disabled = false;
    label[6].style.color = '#000';
  }
  // Express Workshop
  if (label[4].children[0].checked) {
    label[2].children[0].disabled = true;
    label[2].style.color = '#636c72';
    label[6].children[0].disabled = true;
    label[6].style.color = '#636c72';
    return;
  } else {
    label[2].children[0].disabled = false;
    label[2].style.color = '#000';
    label[6].children[0].disabled = false;
    label[6].style.color = '#000';
  }
  // Build Tools Workshop
  if (label[6].children[0].checked) {
    label[2].children[0].disabled = true;
    label[2].style.color = '#636c72';
    label[4].children[0].disabled = true;
    label[4].style.color = '#636c72';
    return;
  } else {
    label[2].children[0].disabled = false;
    label[2].style.color = '#000';
    label[4].children[0].disabled = false;
    label[4].style.color = '#000';
  }
  // JavaScript Libraries Workshop
  if (label[3].children[0].checked) {
    label[5].children[0].disabled = true;
    label[5].style.color = '#636c72';
    label[7].children[0].disabled = true;
    label[7].style.color = '#636c72';
    return;
  } else {
    label[5].children[0].disabled = false;
    label[5].style.color = '#000';
    label[7].children[0].disabled = false;
    label[7].style.color = '#000';
  }
  // Node.js Workshop
  if (label[5].children[0].checked) {
    label[3].children[0].disabled = true;
    label[3].style.color = '#636c72';
    label[7].children[0].disabled = true;
    label[7].style.color = '#636c72';
    return;
  } else {
    label[3].children[0].disabled = false;
    label[3].style.color = '#000';
    label[7].children[0].disabled = false;
    label[7].style.color = '#000';
  }
  // npm Workshop
  if (label[7].children[0].checked) {
    label[3].children[0].disabled = true;
    label[3].style.color = '#636c72';
    label[5].children[0].disabled = true;
    label[5].style.color = '#636c72';
    return;
  } else {
    label[3].children[0].disabled = false;
    label[3].style.color = '#000';
    label[5].children[0].disabled = false;
    label[5].style.color = '#000';
  }
});

// Payment change handler
payment.addEventListener('change', () => {
  // show/hide payment information based on selection
  if (payment.value === 'credit card') {
    creditCard.style.display = 'inline-block';
    payPal.style.display = 'none';
    bitcoin.style.display = 'none';
  }
  if (payment.value === 'paypal') {
    creditCard.style.display = 'none';
    payPal.style.display = 'block';
    bitcoin.style.display = 'none';
  }
  if (payment.value === 'bitcoin') {
    creditCard.style.display = 'none';
    payPal.style.display = 'none';
    bitcoin.style.display = 'block';
  }
});

// Display tooltip and prevent form submit on invalid fields
document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  // name field validation
  if (name.value === '') {
    // display name tooltip
    drops.name.open();
    // prevent form submit
    event.preventDefault();
    // remove tooltip on keypress
    name.addEventListener('keypress', () => {
      drops.name.close();
    });
  }
  // email field validation
  if (email.value === '') {
    // close previous email validation tooltip
    drops.emailValidation.close();
    // display email tooltip
    drops.email.open();
    // prevent form submit
    event.preventDefault();
  }
  // activities checkboxes validation
  if (!checked()) {
    drops.activities.open();
    event.preventDefault();
  } else {
    drops.activities.close();
  }
  // credit card number validation (empty)
  if (payment.value === 'credit card' && ccNum.value === '') {
    drops.creditCardValidation.close();
    drops.creditCard.open();
    event.preventDefault();
  } else {
    drops.creditCard.close();
  }
  // credit card number validation (less than 13 characters or greater than 16 characters)
  if (payment.value === 'credit card' && ccNum.value !== '' && ccNum.value.length < 13 || ccNum.value.length > 16) {
    drops.creditCard.close();
    drops.creditCardValidation.open();
    event.preventDefault();
  } else {
    drops.creditCardValidation.close();
  }
  // zip code validation (empty)
  if (payment.value === 'credit card' && zip.value === '') {
    drops.zipValidation.close();
    drops.zip.open();
    event.preventDefault();
  } else {
    drops.zip.close();
  }
  // zip code validation (not equal to 5 characters)
  if (payment.value === 'credit card' && zip.value !== '' && zip.value.length !== 5) {
    drops.zip.close();
    drops.zipValidation.open();
    event.preventDefault();
  } else {
    drops.zipValidation.close();
  }
  // cvv validation (empty)
  if (payment.value === 'credit card' && cvv.value === '') {
    drops.cvvValidation.close();
    drops.cvv.open();
    event.preventDefault();
  } else {
    drops.cvv.close();
  }
  // cvv validation (not equal to 3 characters)
  if (payment.value === 'credit card' && cvv.value !== '' && cvv.value.length !== 3) {
    drops.cvv.close();
    drops.cvvValidation.open();
    event.preventDefault();
  } else {
    drops.cvvValidation.close();
  }
});

// Email validation event handler
// NOTE: this is assuming a top level domain of 3 characters using the @treehouse.com example
email.addEventListener('keyup', (event) => {
  const at = email.value.indexOf('@');
  const dot = email.value.lastIndexOf('.');
  if (at < 1 || dot < at + 2 || dot + 3 >= email.value.length || email.value.length - dot === 3) {
    drops.email.close();
    drops.emailValidation.open();
    event.preventDefault();
  } else {
    drops.emailValidation.close();
  }
});
