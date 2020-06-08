const fetch = require("node-fetch");

module.exports = function fetchData(config) {
  const { username } = config;
  return fetch(`https://api.github.com/users/${username}/events/public`)
    .then(res => res.json())
    .then(events => ({ username, events }));
}
