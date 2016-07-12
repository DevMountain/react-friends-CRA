module.exports = {
	entry: [
		  'webpack-dev-server/client?http://localhost:8080'
		, './src/index.js'
	]
	, module: {
		loaders: [
			{
				test: /\.js/
				, exclude: /node_modules/
				, loader: 'babel'
			}
			, {
				test: /\.css/
				, exclude: /node_modules/
				, loader: 'style-loader!css-loader'
			}
		]
	}
	, resolve: {
		extensions: ['', '.js', '.jsx']
	}
	, output: {
		path: __dirname + '/dist'
		, publicPath: '/'
		, filename: 'bundle.js'
	}
	, devServer: {
		  contentBase: './dist'
		, historyApiFallback: true
		, stats: {
			colors: true
		}
	}
};