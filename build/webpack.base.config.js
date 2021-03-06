var path = require('path');
var webpack = require('webpack');
// https://github.com/vigneshshanmugam/optimize-js-plugin
// var OptimizeJsPlugin = require('optimize-js-plugin');
var merge = require('webpack-merge');

var config = require('./config');

var __root__ = process.env.ROOT = config.projectRoot;
var src = path.resolve(__root__, 'src');
var test = path.resolve(__root__, 'test');

// https://webpack.js.org/guides/migrating
// https://webpack.js.org/guides/get-started
// Webpack building optimization guide: https://github.com/pigcan/blog/issues/1
module.exports = {
    cache: true,
    profile: true,
    // https://webpack.js.org/configuration/devtool/
    // devtool: 'cheap-module-source-map',
    output: {
        // path option determines the location on disk the files are written to.
        path: config.outputPath,
        // filename is used solely for naming the individual files.
        // `[name]` references key of `entry`
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'immutable-js': src,
            'chai$': path.resolve(test, 'chai.js')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [src, test],
            // , then parse es6 syntax
            use: ['babel-loader?cacheDirectory', 'eslint-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env
        })
    ]
};

if (!config.test) {
    module.exports = merge(module.exports, {
        output: {
            // Export to AMD, CommonJS2 or as property in root
            // http://webpack.github.io/docs/configuration.html#output-librarytarget
            libraryTarget: 'umd'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                test: /\.min\.js$/i,
                fromString: true,
                output: {
                    screw_ie8: true,
                    ascii_only: true
                },
                compress: {
                    pure_funcs: ['makeMap'],
                    warnings: true,
                    keep_fnames: false
                },
                mangle: {
                    keep_fnames: false
                }
            }),
            // NOTE: No filename will be wrote into the sourcemap, so quit to use it.
            // https://github.com/nolanlawson/optimize-js/pull/25/commits/d8a142c592a0727f9545e11687c5a8fe00ed62be
            // https://github.com/Rich-Harris/magic-string#sgeneratemap-options-
            // new OptimizeJsPlugin({
            //     sourceMap: true
            // }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.BannerPlugin({
                test: /\.js$/i,
                banner: config.banner
            })
        ]
    });
}
