import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { source, paths, publicPath, isProduction, alias } from '../config';


/* -----------------------------------------------------------------------------
 * Common Config
 */

let common = {
    output: {
        path: paths.dist.root,
        filename: `${source.js}/[name].js`,
        publicPath: publicPath.root
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.scss'],
        alias: alias
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
                                require('@lipemat/css-mqpacker')({
                                    sort: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: !isProduction,
                            outputStyle: isProduction ? 'compressed' : 'expanded',
                            includePaths: [
                              paths.src.sass,
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
            filename: `${source.css}/[name].css`
        })
    ]
};



/* -----------------------------------------------------------------------------
 * Dev Config
 */

if (!isProduction) {
    module.exports = Object.assign(common, {
        mode: 'development',
        devtool: 'source-map'
    });
}


/* -----------------------------------------------------------------------------
 * Prod Config
 */

if (isProduction) {
    module.exports = Object.assign(common, {
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
