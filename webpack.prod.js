const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { EnvironmentPlugin } = require("webpack");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new EnvironmentPlugin({
      RESOURCE_SERVER_URL: "https://demo-booktrading.carlomiradorjr.com",
    }),
  ],
});
