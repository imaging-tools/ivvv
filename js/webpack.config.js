var path = require("path");
var fs = require("fs");
var version = require("./package.json").version;

const lessToJs = require("less-vars-to-js");
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, "./lib/styles/ant-vars.less"), "utf8")
);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [{
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader"],
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      "resolve-url-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          //          includePaths: [`${__dirname}/src/aics-image-viewer/assets/styles`]
        },
      },
    ],
  },
  {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
  },

  {
    test: /Worker\.js$/,
    use: "worker-loader?inline=true",
  },
];

module.exports = [{
    // Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    //
    entry: "./lib/extension.js",
    output: {
      filename: "extension.js",
      path: path.resolve(__dirname, "..", "ivvv", "static"),
      libraryTarget: "amd",
    },
  },
  {
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    //
    entry: "./lib/index.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "..", "ivvv", "static"),
      libraryTarget: "amd",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
  },
  {
    // Embeddable ivvv bundle
    //
    // This bundle is generally almost identical to the notebook bundle
    // containing the custom widget views and models.
    //
    // The only difference is in the configuration of the webpack public path
    // for the static assets.
    //
    // It will be automatically distributed by unpkg to work with the static
    // widget embedder.
    //
    // The target bundle is always `dist/index.js`, which is the path required
    // by the custom widget embedder.
    //
    entry: "./lib/embed.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "amd",
      publicPath: "https://unpkg.com/ivvv@" + version + "/dist/",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
  },
];