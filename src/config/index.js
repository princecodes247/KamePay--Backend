const env = process.env.NODE_ENV;

const environments = {
  development: require("./env/dev.env.json"),
  // production: require("./env/prod.env.json")
  production: {
    API_URL: "http://localhost:3000",
    API_VERSION: "v1",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/",
    JWT_SECRET: "XXXX-XXXX-XXXX",
    BCRYPT_SALT: 10,
    role: {
      ADMIN: ["admin"],
      USER: ["user", "admin"],
    },

    url: {
      CLIENT_URL: "http://localhost:8080",
      BASE_URL: "http://localhost:8080",
    },
  },
};

// export config for the current environment
module.exports = environments[env] || environments["production"];
