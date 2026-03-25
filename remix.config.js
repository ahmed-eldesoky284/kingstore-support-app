/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverBuildPath: "build/index.js",
  publicPath: "/build/",
  assetsBuildDirectory: "public/build",
};
