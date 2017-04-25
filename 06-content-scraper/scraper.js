/* eslint no-console: off */

// Node Modules
const fs = require('fs');

// NPM Packages
const request = require('request-promise-native');
const cheerio = require('cheerio');
const json2csv = require('json2csv');
const moment = require('moment');

// Constants
const url = 'http://shirts4mike.com/';
const headers = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];

let links = [];
let results = [];
let requests = [];

// Initial request to get all link URLs
request(`${url}shirts.php`, (error, response, body) => {
  // If 404, log error message
  if (response.statusCode === 404) {
    console.log(response.statusMessage);
  } else {
    // Push URLs to links array
    const $ = cheerio.load(body);
    $('.products').children().children().each((i, item) => links.push($(item).attr('href')));
    // Loop through shirts array and push each request to the requests array
    links.forEach(item => requests.push(request(`${url}${item}`)));
    // Pass all requests to Promise.all()
    // Once all promises have been resolved, loop through responses and push data to results array
    Promise.all(requests).then((responses) => {
      responses.forEach((body) => {
        const $ = cheerio.load(body);
        results.push({
          "title": `${$('.shirt-details h1')[0].lastChild.data}`
        });
      });
      // This code runs after all promises have been resolved and forEach loop has finished
      console.log(results);
    });
  }
});
