// Note: this is using some ES2015 syntax - it is valid if you're unfamiliar

// All quotes are objects stored in the quotes array
let quotes = [
  {
    quote: 'Use the force, Luke.',
    source: 'Obi-Wan Kenobi',
    citation: 'Star Wars: Episode IV - A New Hope',
    tags: 'famous',
    number: 1,
    year: 1977,
  },
  {
    quote: 'The ability to destroy a planet is insignificant next to the power of the force.',
    source: 'Darth Vader',
    citation: 'Star Wars: Episode IV - A New Hope',
    tags: 'scary',
    number: 2,
    year: 1977,
  },
  {
    quote: 'Try not. Do or do not. There is no try.',
    source: 'Yoda',
    citation: 'Star Wars: Episode V - The Empire Strikes Back',
    tags: 'motivational',
    number: 3,
    year: 1980,
  },
  {
    quote: 'You truly belong with us among the clouds.',
    source: 'Lando Calrissian',
    citation: 'Star Wars: Episode VI - The Empire Strikes Back',
    tags: 'charming',
    number: 4,
    year: 1980,
  },
  {
    quote: 'Just for once, let me look at you with my own eyes.',
    source: 'Darth Vader',
    citation: 'Star Wars: Episode VI - Return of the Jedi',
    tags: 'sad',
    number: 5,
    year: 1983,
  },
  {
    quote: 'It\'s a trap!',
    source: 'Admiral Ackbar',
    citation: 'Star Wars: Episode VI - Return of the Jedi',
    tags: 'famous',
    number: 6,
    year: 1983,
  }
];

// Displayed quotes will be appended to the viewedQuotes array
let viewedQuotes = [];

// Random number generator used for getRandomQuote() and getRandomColor()
function randomNumber(num) {
  return Math.floor(Math.random() * num);
}

// Pick a random quote object from the quotes array
function getRandomQuote() {
  return quotes[randomNumber(quotes.length)];
}

// Pick a random color for the page background
function getRandomColor() {
  return `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`;
}

// Change quote and background color of page
function printQuote() {
  // Invoke getRandomQuote() and store return value in quote variable
  const quote = getRandomQuote();
  // Log the quote number and quote to console
  console.log(`${quote.number} ${quote.quote}`);
  // Append the viewed quote to the viewedQuotes array and splice from the quotes array
  viewedQuotes.push(quote);
  quotes.splice(quotes.indexOf(quote), 1);
  // Write quote-box div HTML each time printQuote() is invoked
  document.getElementById('quote-box').innerHTML =  `
    <p class="quote">${quote.quote}</p>
    <p class="source">${quote.source}
      <span class="citation">${quote.citation}</span>
      <span class="year">${quote.year}</span>
    </p>
  `;
  // Change body background color each time printQuote() is invoked
  document.getElementsByTagName('body')[0].style = `background: ${getRandomColor()}`;
  // Once quotes array has been emptied, replace with the contents of viewedQuotes and empty viewedQuotes
  if (quotes.length === 0) {
    quotes = viewedQuotes;
    viewedQuotes = [];
  }
}

// Invoke printQuote() on page load
document.addEventListener('DOMContentLoaded', printQuote);

// Invoke printQuote() every 5 seconds
setInterval(printQuote, 5000);

// Button click handler to invoke printQuote()
document.getElementById('loadQuote').addEventListener('click', printQuote);
