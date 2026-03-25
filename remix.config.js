/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  serverBuildPath: "api/index.js",
  publicPath: "/build/",
  assetsBuildDirectory: "public/build",
};
