// src/utils/utility.js

const fs = require('fs');
const path = require('path');

// Define log file path (you can customize it)
const logFilePath = path.join(__dirname, '../../logs/app.log');

// Log function to write messages to both console and a log file
const log = (message, type = 'INFO') => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${type}] ${message}`;

  // Log to console
  console.log(logMessage);

  // Save the log to a file asynchronously
  fs.appendFile(logFilePath, `${logMessage}\n`, (err) => {
    if (err) {
      console.error('Failed to write log to file:', err);
    }
  });
};

module.exports = {
  log,
};
