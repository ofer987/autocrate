const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const COMMON = "common";
const DEVELOPMENT = "development";
const PRODUCTION = "production";

var configurations = {};
configurations[COMMON] = {
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "chrome-extension", to: "" },
        { from: "src/main.html", to: "" },
      ],
    })
  ],
};
configurations[DEVELOPMENT] = {
  name: DEVELOPMENT,
  mode: DEVELOPMENT,
  watch: true,
  entry: `./src/index.${DEVELOPMENT}.ts`,
  devtool: "inline-source-map",
};
configurations[PRODUCTION] = {
  name: PRODUCTION,
  mode: PRODUCTION,
  entry: `./src/index.${PRODUCTION}.ts`,
  watch: false,
};

module.exports = (env) => {
  return { ...configurations[COMMON], ...configurations[env.mode] };
};
