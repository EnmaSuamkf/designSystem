const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://laferiadelcotillon-6b0fa1b9e69e.herokuapp.com",
  timeout: 10000,
});

module.exports = axiosInstance;
