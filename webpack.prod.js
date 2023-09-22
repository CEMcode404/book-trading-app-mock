const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { EnvironmentPlugin } = require("webpack");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new EnvironmentPlugin({
      RESOURCE_SERVER_URL: "https://server-booktrading.carlomiradorjr.com",
      DEMO_USER_EMAIL: "juandelacruz@gmail.com",
      DEMO_USER_PASSWORD: "th1s1s@s3cr3tf0rth3d3m0us3r",
    }),
  ],
});
