/* global Drop */

const drops = {};

drops.name = new Drop({
  target: document.getElementById('name'),
  content: 'Please enter your name',
  position: 'top right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.email = new Drop({
  target: document.getElementById('mail'),
  content: 'Please enter a valid email address',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.emailValidation = new Drop({
  target: document.getElementById('mail'),
  content: 'Invalid email address',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.activities = new Drop({
  target: document.getElementsByClassName('activities')[0].children[7],
  content: 'Please select at least one activity',
  position: 'bottom center',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.creditCard = new Drop({
  target: document.getElementById('cc-num'),
  content: 'Please enter your credit card number',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.creditCardValidation = new Drop({
  target: document.getElementById('cc-num'),
  content: 'Invalid credit card number',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.zip = new Drop({
  target: document.getElementById('zip'),
  content: 'Please enter your zip code',
  position: 'top right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.zipValidation = new Drop({
  target: document.getElementById('zip'),
  content: 'Please enter a 5-digit zip code',
  position: 'top right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.cvv = new Drop({
  target: document.getElementById('cvv'),
  content: 'Please enter your CVV',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});

drops.cvvValidation = new Drop({
  target: document.getElementById('cvv'),
  content: 'Please enter a 3-digit CVV',
  position: 'bottom right',
  classes: 'drop-theme-arrows',
  openOn: null
});
