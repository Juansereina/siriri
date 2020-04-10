/*eslint-env node*/
const lighthouse = require('lighthouse');
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');
const fs = require('fs');
const { lighthouse: lh, endpoint: lhEndpoint } = require('../config');

const { isDocker } = require('./');

// Loads the env vars outside of a docker container
if (!isDocker) require('dotenv').config();

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results)
    });
  });
}

const host = process.env.HOST;
const port = process.env.PORT;
const endpoint = host ? `${host}:${port}` : lhEndpoint;

const writeReport = (html) => {
  fs.writeFile(`${lh.report}.html`, html, (error) => {
    if(error) return console.error(error);
  });
}

// Usage:
launchChromeAndRunLighthouse(endpoint, lh.opts, lh.config).then(report => {
  const html = ReportGenerator.generateReport(report.lhr, 'html')
  log.setLevel(lh.opts.logLevel);
  writeReport(html)
  console.log('Report is done!');
});
