/* eslint no-console: off */

/**
 * 'request-promise-native' wraps the request package with native ES6 promise support
 * 'bluebird' adds promise support to older versions of JavaScript
 * 'chalk' adds text styling to command line output
 * 'cheerio' parses HTML and allows DOM traversal and manipulation using jQuery syntax (3M+ dl/mo)
 * 'moment' parses and displays dates and times
 * 'json2csv' converts JSON to CSV (100k+ dl/mo)
 * 'is-there' is a replacement for the deprecated Node fs.exists method
 * 'functions' are the functions used by this applications
 */
const request = require('request-promise');
const promise = require('bluebird');
const chalk = require('chalk');
const cheerio = require('cheerio');
const moment = require('moment');
const json2csv = require('json2csv');
const isThere = require('is-there');
const functions = require('./functions');

// Messages
const foundLog = chalk.yellow('Log folder found...');
const foundData = chalk.yellow('Data folder found...');
const done = chalk.green.bold('Done!');

// Initial request to get all link URLs
console.log(chalk.bold.white.bgGreen('Content Scraper v1.0.0'));
const url = 'http://www.shirts4mike.com';
const route = 'shirts.php';
request(`${url}/${route}`).then((body) => {
  // Log success message
  const connected = chalk.yellow('Connected to ') + chalk.yellow.bold.underline(`${url}/${route}`);
  console.log(connected);
  
  // Push URLs to links array
  const $ = cheerio.load(body);
  const links = [];
  $('.products').children().children().each((i, item) => {
    links.push($(item).attr('href'));
  });

  // Loop through links array and push each request to the requests array
  const requests = [];
  $(links).each((i, item) => {
    requests.push(request(`${url}/${item}`));
  });

  // Pass all link requests to promise.all()
  // Once all promises have been resolved, loop through responses and push data to results array
  const results = [];
  promise.all(requests).then((responses) => {
    $(responses).each((i, body) => {
      const $ = cheerio.load(body);
      results.push({
        title: `${$('.shirt-details h1')[0].lastChild.data}`,
        price: `${$('.shirt-details h1 span').text()}`,
        imageurl: `${url}/${$('.shirt-picture span img').attr('src')}`,
        url: `${requests[i].href}`,
        time: `${moment().format('h:mm a')}`
      });
    });
    
    // This code runs after all promises have been resolved and each loop has finished
    const fields = ['title', 'price', 'imageurl', 'url', 'time'];
    const fieldNames = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];
    const options = { data: results, fields, fieldNames, quotes: '"' };
    const fileName = `${moment().format('YYYY-MM-DD')}.csv`;
    const csv = json2csv(options);
    
    // If data folder exists
    if (isThere('./data')) {
      console.log(foundData);
      
      // If CSV exists, overwrite it
      if (isThere(`./data/${fileName}`)) {
        functions.writeDataFile(fileName, csv);
      
      // If data folder exists, but CSV doesn't exist, create CSV
      } else {
        functions.createDataFile(fileName, csv);
      }
    
    // If data folder and CSV do not exist, create both
    } else {
      functions.createDataFolderFile(fileName, csv);
    }
    
    // Log done message
    console.log(done);
  
  // Catch errors with link requests
  // Add requests.push(undefined) on line 53 to test
  }).catch(() => {
    const error = chalk.red.bold('Aborted: One of the links is down - please try again later...');
    const errorLog = '404: Not Found - Error scraping one of the links.';
    
    // Log error message
    console.log(error);
    
    // If log folder exists
    if (isThere('./log')) {
      console.log(foundLog);
      
      // If log file exists, append error message
      if (isThere('./log/scraper-error.log')) {
        functions.appendLogFile();
      
      // If log folder exists, but log file doesn't exist, create log file
      } else {
        functions.createLogFile();
      }
    
    // If log folder and log file do not exist, create both
    } else {
      functions.createLogFolderFile();
    }
    
    // Log done message
    console.log(done);
  });

// Catch error with initial request
// Change either url or route variables to undefined on line 39 test
}).catch((response) => {
  const $ = cheerio.load(response.message);
  const statusMessage = $('h1').text();
  const statusCode = response.statusCode;
  const error = chalk.red(`Error (${statusCode || 'ENOTFOUND'}): Cannot connect to `) + chalk.red.bold.underline(`${url}/${route}`);
  const errorLog = `${statusCode || 'ENOTFOUND'}: ${statusMessage || 'Not Found'} - Couldn't connect to ${url}/${route}`;
  
  // Log error message
  console.log(error);
  
  // If log folder exists
  if (isThere('./log')) {
    console.log(foundLog);
    
    // If log file exists, append error message
    if (isThere('./log/scraper-error.log')) {
      functions.appendLogFile();
    
    // If log folder exists, but log file doesn't exist, create log file
    } else {
      functions.createLogFile();
    }
  
  // If log folder and log file do not exist, create both
  } else {
    functions.createLogFolderFile();
  }
  
  // Log done message
  console.log(done);
});
