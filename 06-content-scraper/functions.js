'use strict';

/* eslint no-console: off */

/**
 * 'fs' provides file system i/o
 * 'chalk' adds text styling to command line output
 */
var fs = require('fs');
var chalk = require('chalk');

/**
 * Write data file
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
var writeDataFile = function writeDataFile(fileName, csv) {
  var writeCSV = chalk.yellow('Overwriting ' + fileName + '...');
  console.log(writeCSV);
  fs.writeFileSync('./data/' + fileName, csv, 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not write to CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

/**
 * Create data file
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
var createDataFile = function createDataFile(fileName, csv) {
  var createCSV = chalk.yellow('Creating ' + fileName + '...');
  console.log(createCSV);
  fs.writeFileSync('./data/' + fileName, csv, 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

/**
 * Create data folder and file
 * @param {string} fileName - The CSV filename
 * @param {object} csv - json2csv object
 */
var createDataFolderFile = function createDataFolderFile(fileName, csv) {
  var createData = chalk.yellow('Creating new data folder...');
  var createCSV = chalk.yellow('Creating ' + fileName + '...');
  console.log(createData);
  fs.mkdirSync('./data', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create data folder. Check your file permissions.'));
    if (err) throw err;
  });
  console.log(createCSV);
  fs.writeFileSync('./data/' + fileName, csv, 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

// Append log file
var appendLogFile = function appendLogFile() {
  var appendError = chalk.yellow('Logging error to scraper-error.log...');
  var date = new Date().toString();
  var errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(appendError);
  fs.appendFileSync('./log/scraper-error.log', '[' + date + '] ' + errorLog + '\n', 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not write to log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Create log file
var createLogFile = function createLogFile() {
  var createError = chalk.yellow('Creating scraper-error.log...');
  var date = new Date().toString();
  var errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(createError);
  fs.writeFileSync('./log/scraper-error.log', '[' + date + '] ' + errorLog + '\n', 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Create log folder and file
var createLogFolderFile = function createLogFolderFile() {
  var createLog = chalk.yellow('Creating new log folder...');
  var createError = chalk.yellow('Creating scraper-error.log...');
  var date = new Date().toString();
  var errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(createLog);
  fs.mkdirSync('./log', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create log folder. Check your file permissions.'));
    if (err) throw err;
  });
  console.log(createError);
  fs.writeFileSync('./log/scraper-error.log', '[' + date + '] ' + errorLog + '\n', 'utf8', function (err) {
    console.log(chalk.red.bold('WARNING: Could not create log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Export functions
module.exports = {
  writeDataFile: writeDataFile,
  createDataFile: createDataFile,
  createDataFolderFile: createDataFolderFile,
  appendLogFile: appendLogFile,
  createLogFile: createLogFile,
  createLogFolderFile: createLogFolderFile
};
