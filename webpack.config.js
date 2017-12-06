module.exports = {
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: { sample: './webapp/scripts/sample/sample.entry.ts', sample2: './webapp/scripts/sample/sample2.entry.ts' },
    // ファイルの出力設定
    output: {
        //  出力ファイルのディレクトリ名
        path: `${__dirname}/webapp/wwwroot/js/bundles`,
        // 出力ファイル名
        filename: `[name].bundled.js`
    },
    module: {        
        rules: [            
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                exclude: /node_modules/,
                // TypeScript をコンパイルする
                use: 'ts-loader'
            },
            {
                // 拡張子 .ts の場合
                test: /\.html$/,
                exclude: /node_modules/,
                // TypeScript をコンパイルする                
                use: 'html-loader'
            }
        ]
    },
    // import 文で .ts ファイルを解決するため
    resolve: {
        extensions: [
            '.ts', '.js'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'element-ui$': 'element-ui'
        }
    },
    // ソースマップを有効に
    devtool: 'source-map'
};
