'use strict';

/* eslint no-console: off */

/**
 * 'request-promise' wraps the request package with promise support from Bluebird
 * 'bluebird' adds promise support to older versions of JavaScript
 * 'chalk' adds text styling to command line output
 * 'cheerio' parses HTML and allows DOM traversal and manipulation using jQuery syntax (3M+ dl/mo)
 * 'moment' parses and displays dates and times
 * 'json2csv' converts JSON to CSV (100k+ dl/mo)
 * 'is-there' is a replacement for the deprecated Node fs.exists method
 * 'functions' are the functions used by this application
 */
var request = require('request-promise');
var promise = require('bluebird');
var chalk = require('chalk');
var cheerio = require('cheerio');
var moment = require('moment');
var json2csv = require('json2csv');
var isThere = require('is-there');
var functions = require('./functions');

// Messages
var foundLog = chalk.yellow('Log folder found...');
var foundData = chalk.yellow('Data folder found...');
var done = chalk.green.bold('Done!');

// Initial request to get all link URLs
console.log(chalk.bold.white.bgGreen('Content Scraper v1.0.0'));
var url = 'http://www.shirts4mike.com';
var route = 'shirts.php';
request(url + '/' + route).then(function (body) {
  // Log success message
  var connected = chalk.yellow('Connected to ') + chalk.yellow.bold.underline(url + '/' + route);
  console.log(connected);

  // Push URLs to links array
  var $ = cheerio.load(body);
  var links = [];
  $('.products').children().children().each(function (i, item) {
    links.push($(item).attr('href'));
  });

  // Loop through links array and push each request to the requests array
  var requests = [];
  $(links).each(function (i, item) {
    requests.push(request(url + '/' + item));
  });

  // Pass all link requests to promise.all()
  // Once all promises have been resolved, loop through responses and push data to results array
  var results = [];
  promise.all(requests).then(function (responses) {
    $(responses).each(function (i, body) {
      var $ = cheerio.load(body);
      results.push({
        title: '' + $('.shirt-details h1')[0].lastChild.data,
        price: '' + $('.shirt-details h1 span').text(),
        imageurl: url + '/' + $('.shirt-picture span img').attr('src'),
        url: '' + requests[i].href,
        time: '' + moment().format('h:mm a')
      });
    });

    // This code runs after all promises have been resolved and each loop has finished
    var fields = ['title', 'price', 'imageurl', 'url', 'time'];
    var fieldNames = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];
    var options = { data: results, fields: fields, fieldNames: fieldNames, quotes: '"' };
    var fileName = moment().format('YYYY-MM-DD') + '.csv';
    var csv = json2csv(options);

    // If data folder exists
    if (isThere('./data')) {
      console.log(foundData);

      // If CSV exists, overwrite it
      if (isThere('./data/' + fileName)) {
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
  }).catch(function () {
    var error = chalk.red.bold('Aborted: One of the links is down - please try again later...');
    var errorLog = '404: Not Found - Error scraping one of the links.';

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
}).catch(function (response) {
  var $ = cheerio.load(response.message);
  var statusMessage = $('h1').text();
  var statusCode = response.statusCode;
  var error = chalk.red('Error (' + (statusCode || 'ENOTFOUND') + '): Cannot connect to ') + chalk.red.bold.underline(url + '/' + route);
  var errorLog = (statusCode || 'ENOTFOUND') + ': ' + (statusMessage || 'Not Found') + ' - Couldn\'t connect to ' + url + '/' + route;

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
