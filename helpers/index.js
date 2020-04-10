/*eslint-env node*/
const isProductionMode = process.env.NODE_ENV === 'production';

const isDocker = process.env.DOCKER === 'true';

module.exports = {
  isProductionMode,
  isDocker,
};
