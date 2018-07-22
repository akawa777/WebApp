const path = require('path');
const webpack = require('webpack');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',
   
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
        index: ['./wwwroot/ts/index.ts']
    },

    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'wwwroot/js/bundles'),
        /**
         * output.library
         * window.${output.library}に定義される
         * 今回の場合、`window.vendor_library`になる
         */
        library: '[name]_bundle',
        libraryTarget: 'umd'
    },

    devtool: 'source-map',

    plugins: [
        new webpack.DllReferencePlugin({
          context: __dirname,
          /**
           * manifestファイルをロードして渡す
           */
          manifest: require('./wwwroot/js/bundles/kernel-manifest.json'),

          sourceType: 'umd'
        })
    ],
   
    module: {
      rules: [
        {
          // 拡張子 .ts の場合
          test: /\.ts$/,
          // TypeScript をコンパイルする
          use: [
            // {
            //   // Babel を利用する
            //   loader: 'babel-loader',
            //   // Babel のオプションを指定する
            //   options: {
            //     presets: [
            //       // env を指定することで、ES2018 を ES5 に変換。
            //       // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
            //       // webpack の Tree Shaking 機能が使えない
            //       ['env', {'modules': true}]
            //     ]
            //   }
            // },
            {            
              loader: 'ts-loader'
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
      extensions: [
        '.ts'
      ]
    }
  };
  