const path = require('path');

module.exports = {
    entry: "./src/index.ts",
    watch: false,
    mode: "production",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
            },
            {
                test: [/\.sass$/, /\.scss$/],
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ],
    },
};
