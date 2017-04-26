/* eslint no-console: off */

/**
 * 'fs' provides file system i/o
 * 'chalk' adds text styling to command line output
 */
const fs = require('fs');
const chalk = require('chalk');

/**
 * Write data file
 * @param {object} disk - node-emoji object
 * @param {string} writeCSV - Message to log to command line
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
const writeDataFile = (disk, writeCSV, fileName, csv) => {
  console.log(disk, writeCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, (err) => {
    console.log(chalk.red.bold('WARNING: Could not write to CSV!'));
    if (err) throw err;
  });
};

/**
 * Create data file
 * @param {object} disk - node-emoji object
 * @param {string} createCSV - Message to log to command line
 * @param {string} fileName - CSV filename
 * @param {object} csv - json2csv object
 */
const createDataFile = (disk, createCSV, fileName, csv) => {
  console.log(disk, createCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, (err) => {
    console.log(chalk.red.bold('WARNING: Could not create CSV!'));
    if (err) throw err;
  });
};

/**
 * Create data folder and file
 * @param {ojbect} folder - node-emoji object
 * @param {object} disk - node-emoji object
 * @param {string} createData - Message to log to command line
 * @param {string} createCSV - Message to log to command line
 * @param {string} fileName - The CSV filename
 * @param {object} csv - json2csv object
 */
const createDataFolderFile = (folder, disk, createData, createCSV, fileName, csv) => {
  console.log(folder, createData);
  fs.mkdirSync('./data', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create data folder!'));
    if (err) throw err;
  });
  console.log(disk, createCSV);
  fs.writeFileSync(`./data/${fileName}`, csv, (err) => {
    console.log(chalk.red.bold('WARNING: Could not create CSV!'));
    if (err) throw err;
  });
};

/**
 * Append log file
 * @param {object} disk - node-emoji object
 * @param {string} appendError - Message to log to command line
 * @param {string} date - Timestamp
 * @param {string} errorLog - Message to append to log file
 */
const appendLogFile = (disk, appendError, date, errorLog) => {
  console.log(disk, appendError);
  fs.appendFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, (err) => {
    console.log(chalk.red.bold('WARNING: Could not write to scraper-error.log!'));
    if (err) throw err;
  });
};

/**
 * Create log file
 * @param {object} disk - node-emoji object
 * @param {string} createError - Message to log to command line
 * @param {string} date - Timestamp
 * @param {string} errorLog - Message to write to log file
 */
const createLogFile = (disk, createError, date, errorLog) => {
  console.log(disk, createError);
  fs.writeFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, (err) => {
    console.log(chalk.red.bold('WARNING: Could not create file scraper-error.log!'));
    if (err) throw err;
  });
};

/**
 * Create log folder and file
 * @param {object} folder - node-emoji object
 * @param {object} disk - node-emoji object
 * @param {string} createLog - Message to log to command line
 * @param {string} createError - Message to log to command line
 * @param {string} date - Timestamp
 * @param {string} errorLog - Message to write to log file
 */
const createLogFolderFile = (folder, disk, createLog, createError, date, errorLog) => {
  console.log(folder, createLog);
  fs.mkdirSync('./log', (err) => {
    console.log(chalk.red.bold('WARNING: Could not create log folder!'));
    if (err) throw err;
  });
  console.log(disk, createError);
  fs.writeFileSync('./log/scraper-error.log', `[${date}] ${errorLog}\n`, (err) => {
    console.log(chalk.red.bold('WARNING: Could not create file scraper-error.log!'));
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
