const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
	entry: {
		app: './src/main.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
	contentBase: path.join(__dirname, 'dist'),
	writeToDisk: true,
	},
	plugins: [
	new CleanWebpackPlugin(),
	new DefinePlugin({
		BACKEND_URL: JSON.stringify("http://localhost:5000/"),
	}),
	new CopyWebpackPlugin({
		patterns: [
			{ from: "src/assets", to: "assets" },
		],
	}),
		new HtmlWebpackPlugin({
		template: "./src/main.html",
		inject: "head",
	}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
			}
		],
	},
};
