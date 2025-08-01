import fs from 'fs';
import { URL } from 'url'; // in Browser, the URL in native accessible on window
import path from 'path';
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';


class ChunkRenamePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('ChunkRenamePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'ChunkRenamePlugin',
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          for (const chunk of compilation.chunks) {
            if (chunk.canBeInitial()) continue;

            const modules = Array.from(chunk.modulesIterable);
            const langModule = modules.find(
              (m) => m.resource && m.resource.endsWith('.lang')
            );

            if (!langModule) continue;

            const resource = langModule.resource;
            const parts = resource.split(path.sep);
            const compIndex = parts.indexOf('components');
            const component = parts[compIndex + 1];
            const baseFile = path.basename(resource);

            const match = baseFile.match(/^(.+)\.([a-z]{2})\.lang$/);
            if (!match) continue;

            const [, compName, langCode] = match;
            const newName = `components/${component}/${component}-${langCode}.lang.json`;

            const fileToRename = Array.from(chunk.files)[0];
            if (!fileToRename || !assets[fileToRename]) continue;

            const asset = assets[fileToRename];
            compilation.deleteAsset(fileToRename);
            compilation.emitAsset(newName, asset);

            chunk.files.delete(fileToRename);
            chunk.files.add(newName);
          }
        }
      );
    });
  }
}


// Will contain trailing slash
const __dirname = new URL('.', import.meta.url).pathname;
const mode = process.env.NODE_ENV || 'development';



const componentsDir = path.resolve(__dirname, 'src/components');

const entryPoints = {
  'bbn-cp': path.resolve(__dirname, 'src/index.js'),
  'bbn-cp-components': path.resolve(__dirname, 'src/all.js'),
};

const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

componentDirs.forEach(comp => {
  const componentEntry = path.resolve(componentsDir, comp, `${comp}.js`);
  if (fs.existsSync(componentEntry)) {
    const key = `components/${comp}/${comp}`;
    entryPoints[key] = componentEntry;
  }
});






// Dynamically find all component middle-man .mjs files
export default {
    mode: mode,
    // Entry file(s)
    entry: entryPoints,
    // Output configuration
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
        chunkFilename: pathData => {
          const name = pathData.chunk.name || '';
          if (name.includes('bbn-css')) {
            return `css/${name.replace(/vendors-node_modules_bbn_bbn-css_dist_css_/, '')}.js`;
          }

          return '[name].js';
        },
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'window',
    },
    // Set up loaders
    module: {
        rules: [
            {
              test: /\.(woff2?|ttf|eot|svg|png|jpg|gif)$/,
              include: /@bbn[\\/]bbn-css/,
              type: 'asset/resource',
              generator: {
                filename: 'css/[name][ext]'
              }
            },
            {
              test: /\.css$/,
              include: /@bbn[\\/]bbn-css/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
              ]
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src/components')], // only target your component files
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true,
                            test: /index\.js$/,
                        }
                    },
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
                exclude: /@bbn[\\/]bbn-css/,
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /@bbn[\\/]bbn-css/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      url: {
                        filter: (url, resourcePath) => {
                          // Don't resolve URLs in flag-icons CSS
                          //if (resourcePath.includes('flag-icons') || resourcePath.includes('bbn-css')) {
                          if (resourcePath.includes('bbn-css')) {
                            return false;
                          }
                          return true;
                        }
                      }
                    }
                  }
                ]
            },
            /*
            {
              test: /\.svg$/,
              type: 'asset/resource',
              include: /node_modules[\\/]flag-icons/,
              generator: {
                filename: 'flags/[name][ext]'
              }
            },*/

        ],
    },

    externals : {
        bbn: 'bbn'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
              bbnCss: {
                test: /[\\/]node_modules[\\/]@bbn[\\/]bbn-css[\\/]/,
                name: (module, chunks, cacheGroupKey) => {
                  const filePath = module.identifier();
                  const match = filePath.match(/bbn-css[\\/](.*)\.css/);
                  return match ? match[1].replace(/[\\/]/g, '-') : 'bbn-css';
                },
                chunks: 'all',
                enforce: true,
              },
              default: false,
              vendors: false,
            }
        },
        minimize: mode === 'production',
        minimizer: [new TerserPlugin()],
        concatenateModules: true
    },

    // Plugins (if you have any)
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: ({ chunk }) => {
            const name = chunk.name || '';
            if (name.includes('vendors-node_modules_bbn_bbn-css_dist_css_')) {
              return `css/${name.replace(/vendors-node_modules_bbn_bbn-css_dist_css_/, '')}.css`;
            }
            if (name.includes('node_modules_bbn_bbn-css_dist_css_')) {
              return `css/${name.replace(/node_modules_bbn_bbn-css_dist_css_/, '')}.css`;
            }
            return 'css/[name].css';
          },
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'node_modules/flag-icons/flags'),
              to: 'flags'
            }, 
          ]
        }),
        new webpack.DefinePlugin({
            IS_TESTING: false,
        }),
    ],
    // Optional: Development server configuration
    // devServer: {
    //     contentBase: path.join(__dirname, 'public'),
    //     compress: true,
    //     port: 9000
    // },

    // Optional: Source maps for development
    devtool: mode === 'production' ? false : 'eval-source-map',
};


