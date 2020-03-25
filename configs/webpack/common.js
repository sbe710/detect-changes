const {resolve, join} = require("path");
const {CheckerPlugin} = require("awesome-typescript-loader");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const basePlugins = [
    new CheckerPlugin(),
    new HTMLWebpackPlugin({ template: "./index.html" }),
];

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "@": resolve(__dirname, "../../src")
        }
    },
    context: resolve(__dirname, "../../src"),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "source-map-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "awesome-typescript-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } }
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
                ],
            }
        ],
    },
    plugins: process.env.BUNDLE_ANALYZER ? [
            ...basePlugins,
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: join(
                    process.cwd(),
                    "webpack-bundle-analyzer.html"
                )
            })
        ]
        : basePlugins,
    performance: {
        hints: false
    }
};
