const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'block-one': path.resolve(__dirname, 'src/block-one/index.js'),
        'block-two': path.resolve(__dirname, 'src/block-two/index.js')
    }
};
