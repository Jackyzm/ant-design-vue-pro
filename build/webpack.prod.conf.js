"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {
    mode: config.build.mode,

    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath("js/[name].[chunkhash].js"),
        chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
        publicPath: config.build.assetsPublicPath
    },
    devtool: false,
    optimization: {
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                // Enable file caching
                cache: true,
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //   'process.env': require('../config/prod.env')
        // }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath("css/[name].[chunkhash].css"),
            chunkFilename: utils.assetsPath("css/[id].[chunkhash].css")
        }),

        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting

        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../static"),
                to: config.build.assetsSubDirectory,
                ignore: [".*"]
            }
        ]),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require("compression-webpack-plugin");

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: new RegExp(
                "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
