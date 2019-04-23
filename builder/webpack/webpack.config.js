import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { source, paths, publicPath, ext, filename, isProduction, isWatching, gulpType } from '../config';


/* -----------------------------------------------------------------------------
 * Common Config
 */

let common = {
    output: {
        path: paths.dist.root,
        filename: `${source.js}/${filename.js}.js`,
        publicPath: publicPath.root
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.scss'],
        alias: {
            node_modules: paths.node_modules,
            modules: paths.src.modules
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: !isProduction,
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: '> 5%'
                                }),
                                require('css-mqpacker')({
                                    sort: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProduction,
                            outputStyle: isProduction && 'compressed',
                            includePaths: [
                              paths.src.scss,
                            ],
                        }
                    }

                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /(a-z A-Z 0-9)*\/(font?s)\//,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: source.images,
                            publicPath: publicPath.images
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/i,
                exclude: /(a-z A-Z 0-9)*\/(img|image?s)\//,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: source.fonts,
                        publicPath: publicPath.fonts
                    },
                }],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${source.css}/${filename.scss}.css`
        })
    ]
};



/* -----------------------------------------------------------------------------
 * Dev Config
 */

if (!isProduction) {
    module.exports = merge(common, {
        mode: 'development',
        devtool: 'source-map'
    });
}


/* -----------------------------------------------------------------------------
 * Prod Config
 */

if (isProduction) {
    module.exports = merge(common, {
        mode: 'production',
        optimization: {
            minimizer: [
                new UglifyJSPlugin({
                    parallel: true,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ],
        }
    });
}