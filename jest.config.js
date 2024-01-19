module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setUpTests.js"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/tests/**/*.js?(x)"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
