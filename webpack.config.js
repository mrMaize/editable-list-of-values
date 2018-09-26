const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const production = process.argv.reduce(function (p, c) {
    return p || c === '-p'
}, false);

const config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true
    },
    devtool: production ? 'cheap-source-map' : 'source-map',
    node: {
        fs: 'empty'
    },
    externals: [
        {
            './cptable': 'var cptable'
        },
        {
            './jszip': 'jszip'
        }
    ],
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"],
                    "plugins": ["transform-decorators-legacy", "transform-decorators"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};

module.exports = config;