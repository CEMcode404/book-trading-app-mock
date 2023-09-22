const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { EnvironmentPlugin } = require("webpack");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    new EnvironmentPlugin({
      RESOURCE_SERVER_URL: "http://localhost:8000",
      DEMO_USER_EMAIL: "juandelacruz@gmail.com",
      DEMO_USER_PASSWORD: "th1s1s@s3cr3tf0rth3d3m0us3r",
    }),
  ],
});
