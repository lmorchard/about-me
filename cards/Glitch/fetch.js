import { fetchJson } from '../../lib/utils.js';

const BASE_URL = 'https://api.glitch.com';

const fetchAPI = (path) => fetchJson(`${BASE_URL}/${path}`);

export default async function fetchData(config, _name) {
  const { login } = config;

  const userId = await fetchAPI(`userId/byLogin/${login}`);
  const user = await fetchAPI(`users/${userId}`);

  return { login, userId, user };
}
