const { fetchJson } = require('../../lib/utils');

module.exports = async function fetchData(config, name) {
  const { username, channelId, key } = config;
  return {
    username,
    channelId,
    ...(await fetchJson(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${key}`
    )),
  };
};
