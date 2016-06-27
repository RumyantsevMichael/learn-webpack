'use strict';

const webpack = require('webpack'),
      NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {

	watch: NODE_ENV === 'dev',

	devServer: {
		contentBase: './web',
		stats: {
			colors: true
		}
	},

	entry: {
		
	},

	output: {
		path: __dirname + '/web/bundles',
		publicPath: '/',
		filename: '[name].bundle.js'
	},

	devtool: NODE_ENV === 'dev' ? 'source-map' : null,

	resolve: {
		extensions: ['', '.js']
	},

	resolveLoader: {
		extensions: ['', '.js']
	},

	module: {		
		loaders: [
			{
				test: /\.js$/,
				include: /src/,
				exclude: /node_modules/,
				loader: 'babel?presets[]=es2015'
			},
			{
				test: /\.styl$/,
				include: /src/,
				exclude: /node_modules/,
				loader: 'style!css!postcss!stylus'
			},
			{
				test: /\.html$/,
				include: /src/,
				exclude: /node_modules/,
				loader: 'file?name=[name].[ext]'
			}
		]
	},

	postcss: () => [
		require('autoprefixer'),
		require('rebem-css')
	],

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}
