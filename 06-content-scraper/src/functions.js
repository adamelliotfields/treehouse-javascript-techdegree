/* eslint no-console: off */

/**
 * 'fs' provides file system i/o
 * 'chalk' adds text styling to command line output
 */
const fs = require('fs');
const chalk = require('chalk');

/**
 * Write data file
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
const writeDataFile = (fileName, csv) => {
  const writeCSV = chalk.yellow(`Overwriting ${fileName}...`);
  console.log(writeCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not write to CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

/**
 * Create data file
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
const createDataFile = (fileName, csv) => {
  const createCSV = chalk.yellow(`Creating ${fileName}...`);
  console.log(createCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

/**
 * Create data folder and file
 * @param {string} fileName - The CSV filename
 * @param {object} csv - json2csv object
 */
const createDataFolderFile = (fileName, csv) => {
  const createData = chalk.yellow('Creating new data folder...');
  const createCSV = chalk.yellow(`Creating ${fileName}...`);
  console.log(createData);
  fs.mkdirSync('./data', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create data folder. Check your file permissions.'));
    if (err) throw err;
  });
  console.log(createCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create CSV. Check your file permissions.'));
    if (err) throw err;
  });
};

// Append log file
const appendLogFile = () => {
  const appendError = chalk.yellow('Logging error to scraper-error.log...');
  const date = new Date().toString();
  const errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(appendError);
  fs.appendFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not write to log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Create log file
const createLogFile = () => {
  const createError = chalk.yellow('Creating scraper-error.log...');
  const date = new Date().toString();
  const errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(createError);
  fs.writeFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Create log folder and file
const createLogFolderFile = () => {
  const createLog = chalk.yellow('Creating new log folder...');
  const createError = chalk.yellow('Creating scraper-error.log...');
  const date = new Date().toString();
  const errorLog = '404: Not Found - Error scraping one of the links.';
  console.log(createLog);
  fs.mkdirSync('./log', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create log folder. Check your file permissions.'));
    if (err) throw err;
  });
  console.log(createError);
  fs.writeFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, 'utf8', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create log. Check your file permissions.'));
    if (err) throw err;
  });
};

// Export functions
module.exports = {
  writeDataFile,
  createDataFile,
  createDataFolderFile,
  appendLogFile,
  createLogFile,
  createLogFolderFile
};
