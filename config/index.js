/*eslint-env node*/
const yaml = require('js-yaml');
const fs = require('fs');
const merge = require('deepmerge');
const { isProductionMode } = require('../helpers');

/* Helpers */
const readFile = (file, read = true) => (read ? yaml.safeLoad(fs.readFileSync(`./config/${file}.yml`, 'utf8')) : {});

/* config files */
const basic = readFile('default');
const prod = readFile('production', isProductionMode);

module.exports = merge(basic, prod);
