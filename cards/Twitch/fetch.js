
module.exports = async function fetchData(config) {
  const { username, userId, clientId, accessToken } = config;

  const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}`;
  const headers = {
    "Client-ID": clientId,
    Authorization: `Bearer ${accessToken}`,
  };
  const resp = await fetch(url, { method: "GET", headers });
  const data = await resp.json();

  return {
    username,
    clips: data.data,
  };
};
