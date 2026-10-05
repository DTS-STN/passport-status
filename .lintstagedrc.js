const path = require('path');

const buildEslintCommand = (filenames) => `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx,md,json}': 'prettier --write',
};
