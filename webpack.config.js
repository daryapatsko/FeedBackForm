const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        filename: './src/js/script.js',
    },
    output: {
        filename: 'bundle.js',
    },
    mode: 'development',
}