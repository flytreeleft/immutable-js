var path = require('path');
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.config');
var config = require('./config');

var __root__ = config.projectRoot;
var src = path.resolve(__root__, 'src');

module.exports = merge(baseWebpackConfig, {
    name: 'Immutable JS',
    entry: {
        'immutable': [path.resolve(src, 'index.js')],
        'immutable.min': [path.resolve(src, 'index.js')]
    }
});
