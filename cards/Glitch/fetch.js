const fetch = require("node-fetch");
const { fetchJson } = require('../../lib/utils');

const BASE_URL = "https://api.glitch.com";

const fetchAPI = path => fetchJson(`${BASE_URL}/${path}`);

module.exports = async function fetchData(config, name) {
  const { login } = config;

  const userId = await fetchAPI(`userId/byLogin/${login}`);
  const user = await fetchAPI(`users/${userId}`);

  return { login, userId, user };
}
