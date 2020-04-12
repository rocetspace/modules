const clone = require('lodash/cloneDeep');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackConfig = require('copy-webpack-plugin');

const template = {
    mode: process.env.NODE_ENV,

    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        libraryTarget: 'umd',
    },

    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    externals: {
        "react": true,
        "react-dom": true,
        "react-jss": true,
    },

    module: {
        rules: [
            {
                parser: {
                    system: false
                }
            }
        ]
    }
}

const first = clone(template);
const second = clone(template);

second.entry = './second.js';
second.output.filename = 'second.js';

first.entry = './index.js';
first.output.filename = 'build.js';
first.plugins = [
    new HtmlWebpackPlugin({
        template: 'static/index.html',
        inject: false,
    }),

    new CopyWebpackConfig([
        ...[
            'node_modules/jss/dist/jss.min.js',
            'node_modules/react-jss/dist/react-jss.js',
            'node_modules/systemjs/dist/system.min.js',
            'node_modules/systemjs/dist/extras/amd.min.js',
            'node_modules/react/umd/react.production.min.js',
            'node_modules/react-dom/umd/react-dom.production.min.js',
        ].map(vendor => ({
            from: vendor,
            to: 'vendor',
        })),
    ]),
];

module.exports = [first, second];