const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'maw-block-one': path.resolve(__dirname, 'src/block-one/index.js'),
        'maw-responsive-tables': path.resolve(__dirname, 'src/responsive-tables/index.js')
    }
};
