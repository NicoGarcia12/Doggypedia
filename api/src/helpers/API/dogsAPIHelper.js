require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const getDogsNameAPI = async (name) => {
  return await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
};

const getDogsAPI = async () => {
  return await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
};
module.exports = {
  getDogsAPI,
  getDogsNameAPI,
};
