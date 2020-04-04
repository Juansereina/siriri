/*eslint-env node*/
const yaml = require('js-yaml');
const fs   = require('fs');
const merge = require('deepmerge')

/* Helpers */
const production = process.env.NODE_ENV === 'production';
const readFile = (file, read = true) => read ? yaml.safeLoad(fs.readFileSync(`./config/${file}.yml`, 'utf8')) : {};

/* config files */
const basic = readFile('default')
const prod =  readFile('production', production);

module.exports = merge(basic, prod);
