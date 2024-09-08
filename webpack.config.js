import { URL } from 'url'; // in Browser, the URL in native accessible on window
import path from 'path';
import TerserPlugin from "terser-webpack-plugin";

// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;
import webpack from 'webpack';
const mode = process.env.NODE_ENV || 'development';

const componentsDir = path.resolve(__dirname, 'src/components');

// Dynamically find all component middle-man .mjs files
const entryPoints = {
  'bbn-cp': path.resolve(__dirname, 'src/index.js')    
};

/*
fs.readdirSync(componentsDir).forEach(dir => {
  const middleManFile = path.join(componentsDir, dir, `${dir}.js`);
  if (fs.existsSync(middleManFile)) {
    entryPoints[`components/${dir}/${dir}`] = middleManFile;
  }
});
*/
export default {
    mode: mode,
    // Entry file(s)
    entry: entryPoints,

    // Output configuration
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: chunkData => {
            if (chunkData.chunk.name === 'bbn-cp') {
              return 'bbn-cp.js';
            }
            return `${chunkData.chunk.name}.js`;
        },
        libraryTarget: 'global'
    },

    // Set up loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/components')], // only target your component files
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    //path.resolve(__dirname, './filename-loader.js')
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.lang$/,
                type: 'json'
            },
            {
                test: /\.less$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            }
        ],
    },

    externals : {
        bbn: 'bbn'
    },
    
    // Resolve extensions and modules
    /*
    resolve: {
        extensions: ['.js', '.json'],
        preferRelative: true,
        modules: [
            'node_modules'
        ],
    },
    */
    optimization: {
        /*
        splitChunks: {
            cacheGroups: {
                components: {
                    test: /[\\/]components[\\/]/,
                    name: (module, chunks, cacheGroupKey) => {
                        const match = module.resource.match(/[\\/]components[\\/](.+?)[\\/]/);
                        if (match) {
                            // Add a prefix or modify this to ensure a unique name
                            return `dynamic-${cacheGroupKey}/${match[1]}/${match[1]}`;
                        }
                        return 'vendor';
                    },
                    chunks: 'all'
                }
            }
        },
        */
        minimize: mode === 'production',
        minimizer: [new TerserPlugin()],
        concatenateModules: true
    },

    // Plugins (if you have any)
    plugins: [
        new webpack.DefinePlugin({
            IS_TESTING: JSON.stringify(process.env.IS_TESTING),
        }),
    ],
    // Optional: Development server configuration
    // devServer: {
    //     contentBase: path.join(__dirname, 'public'),
    //     compress: true,
    //     port: 9000
    // },

    // Optional: Source maps for development
    //devtool: 'inline-source-map',
};


