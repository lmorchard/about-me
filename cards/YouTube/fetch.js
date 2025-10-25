import { fetchJson } from '../../lib/utils.js';

export default async function fetchData(config, _name) {
  const { username, channelId, key } = config;
  return {
    username,
    channelId,
    ...(await fetchJson(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${key}`
    )),
  };
}
