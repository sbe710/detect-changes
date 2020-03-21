const {resolve} = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    context: resolve(__dirname, "src"),
    module: {
        rules: [
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
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
                ]
            }
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: ""
        })
    ]
};
