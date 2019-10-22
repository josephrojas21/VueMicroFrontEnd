const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: ['./src/portal.js'],
	output: {
		publicPath: '',
		filename: '[name].js',
		path: path.resolve(__dirname, 'release'),
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.(png|jpg|gif|svg|ico)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						// Requires sass-loader@^7.0.0
						options: {
							implementation: require('sass'),
							fiber: require('fibers'),
							indentedSyntax: true // optional
						}
					}
				]
			}
		],
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	plugins: [
		new VueLoaderPlugin(),
		CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'src/index.html') },
			{ from: path.resolve(__dirname, 'src/style.css') },
			{ from: path.resolve(__dirname, 'libs/system.js') },
		]),
		new CleanWebpackPlugin(['release'])
	],
	devtool: 'source-map',
	externals: [
	],
	mode: 'development',
	devServer: {
		contentBase: './release',
		historyApiFallback: true,
		watchOptions: { aggregateTimeout: 300, poll: 1000 },
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},
		// Proxy config for development purposes. In production, you would configure you webserver to do something similar.
		proxy: {
			"/app1": {
				name: "app1",
				url: "/app1/singleSpaEntry.js",
				target: "http://localhost:9001",
				pathRewrite: { "^/app1": "" }
			},
			"/app2": {
				name: "app2",
				url: "/app2/singleSpaEntry.js",
				target: "http://localhost:9002",
				pathRewrite: { "^/app2": "" }
			},
			"/app3": {
				name: "app3",
				url: "/app3/singleSpaEntry.js",
				target: "http://localhost:9003",
				pathRewrite: { "^/app3": "" }
			},
			"/app4": {
				name: "app4",
				url: "/app4/singleSpaEntry.js",
				target: "http://localhost:9004",
				pathRewrite: { "^/app4": "" }
			},
			"/app5": {
				name: "app5",
				url: "/app5/singleSpaEntry.js",
				target: "http://localhost:9005",
				pathRewrite: { "^/app5": "" }
			}
		}
	}
};
