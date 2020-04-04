/*eslint-env node*/
const yaml = require('js-yaml');
const fs   = require('fs');

const production = process.env.NODE_ENV === 'production';
const source = production ? 'production' : 'default';
const config = yaml.safeLoad(fs.readFileSync(`./config/${source}.yml`, 'utf8'));

module.exports = config;
