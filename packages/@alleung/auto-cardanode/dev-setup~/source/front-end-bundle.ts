import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as express from "express";

const FRONT_END_PATH = path.resolve(__dirname, '../../front-end~');
const FRONT_END_JS_PATH = path.resolve(FRONT_END_PATH, "./build");
const FRONT_END_BUNDLE_PATH = path.resolve(FRONT_END_PATH, "./bundle");

const compiler = webpack.webpack({
    target: "web",
    mode: 'development',
    entry: [
        "@alleung/auto-cardanode-front-end/build/spa.js",
        "./source/dyn-host-name.js",
        "webpack-hot-middleware/client?reload=true&dynamicPublicPath=true&path=__webpack_hmr",
    ],
    output: {
        path: FRONT_END_BUNDLE_PATH
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({})
    ]
});

compiler.outputFileSystem = fs as any;

const app = express();
app.use(webpackDevMiddleware(compiler as any, {
    writeToDisk: true,
    headers: { "Access-Control-Allow-Origin": "*" }
}));
app.use(webpackHotMiddleware(compiler as any, {}))
app.listen(3000);

/*
compiler.watch({}, (error, stats) => {
    let message = 'Compiled successfully.';
    if (stats.hasErrors()) {
        message = 'Failed to compile.';
    } else if (stats.hasWarnings()) {
        message = 'Compiled with warnings.';
    }
    console.log(message);
    const toStringOptions = "minimal"; // "verbose"; // TODO: Use verbose but parse through the stats in order to get list of all dependencies then bring to dashboard.
    if (stats.hasErrors()) console.error(stats.toString(toStringOptions));
    else if (stats.hasWarnings()) console.warn(stats.toString(toStringOptions));
    else console.log(stats.toString(toStringOptions));
});
*/