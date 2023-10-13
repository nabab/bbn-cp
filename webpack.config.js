import { URL } from 'url'; // in Browser, the URL in native accessible on window

// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;
import webpack from 'webpack';

export default {
    mode: "development",
    // Entry file(s)
    entry: './src/index.js',

    // Output configuration
    output: {
        path: __dirname  + 'dist',
        filename: 'bbn-cp.js',
        libraryTarget: 'global'
    },

    // Set up loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    // Resolve extensions and modules
    resolve: {
        extensions: ['.js'],
        modules: [
            'dist',
            'node_modules'
        ]
    },
    optimization: {
        concatenateModules: true
    },

    // Plugins (if you have any)
    plugins: [
      new webpack.DefinePlugin({
        IS_TESTING: JSON.stringify(process.env.IS_TESTING)
      })
    ],
    externals: {
        "bbn": "bbn"
    },

    // Optional: Development server configuration
    // devServer: {
    //     contentBase: path.join(__dirname, 'public'),
    //     compress: true,
    //     port: 9000
    // },

    // Optional: Source maps for development
    devtool: 'source-map',
};

