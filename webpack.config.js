const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const COMMON = "common";
const DEVELOPMENT = "development";
const PRODUCTION = "production";

var configurations = {};
configurations[COMMON] = {
  output: {
    filename: "[name].js",
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
        { from: "src/options.html", to: "" },
      ],
    })
  ],
};
configurations[DEVELOPMENT] = {
  name: DEVELOPMENT,
  mode: DEVELOPMENT,
  watch: true,
  entry: {
    main: `./src/index.ts`,
    options: "./src/options.ts",
  },
  devtool: "inline-source-map",
};
configurations[PRODUCTION] = {
  name: PRODUCTION,
  mode: PRODUCTION,
  entry: {
    main: `./src/index.ts`,
    options: "./src/options.ts",
  },
  watch: false,
};

module.exports = (env) => {
  return { ...configurations[COMMON], ...configurations[env.mode] };
};
