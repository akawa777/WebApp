const path = require('path');
const webpack = require('webpack');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',
   
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: {
      kernel : ['./wwwroot/ts/kernel.ts']
    },

    output: {
      　// require.jsを使用するのでライブラリ名とjs名は同じにする
        filename: '[name].dll.js',
        path: path.join(__dirname, 'wwwroot/js/bundles'),
        /**
         * output.library
         * window.${output.library}に定義される
         * 今回の場合、`window.vendor_library`になる
         * しかし、require.jsを利用するので不要かもしれない
         */
        // library: '[name]_library',
        libraryTarget: 'umd'
    },
   
    devtool: 'source-map',

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
            //       ['env', {'modules': false }]
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
    },

    plugins: [
      new webpack.DllPlugin({
        /**
         * path
         * manifestファイルの出力先
         * [name]の部分はentryの名前に変換される
         */
        path: path.join(__dirname, 'wwwroot/js/bundles', '[name]-manifest.json'),
        /**
         * name
         * どの空間（global変数）にdll bundleがあるか
         * output.libraryに指定した値を使えばよい
         * 
         * 今回の場合、参照時にsourceTypeをumdにする、かつ、
         * require.jsを使用するのでライブラリ名とjs名は同じにする
         */
        name: '[name].dll'
      })
    ]
  };
  