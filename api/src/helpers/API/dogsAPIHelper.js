const { API_KEY } = process.env;
let Link = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const axios = require("axios");
const getDogsNameAPI = async (name) => {
  return await axios(`${Link}/search?q=${name}}`);
};

const getDogsAPI = async () => {
  return await axios(Link);
};
module.exports = {
  getDogsAPI,
  getDogsNameAPI
};
