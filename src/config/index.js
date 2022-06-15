const env = process.env.NODE_ENV;

const environments = {
  development: require("./env/dev.env.json"),
  // production: require("./env/prod.env.json")
  production: {
    API_URL: "http://localhost:3000",
    API_VERSION: "v1",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  },
};

// export config for the current environment
module.exports = environments[env] || environments["production"];
