const fetch = require("node-fetch");

module.exports = async function fetchData(config) {
  const { username, ignoreRepos = [], numPages = 3, perPage = 100 } = config;
  const events = [];
  for (let idx = 1; idx <= numPages; idx++) {
    const apiUrl = `https://api.github.com/users/${username}/events/public?page=${idx}&per_page=${perPage}`;
    const resp = await fetch(apiUrl);
    events.push(...(await resp.json()));
  }
  return {
    username,
    events: events.filter((event) => !ignoreRepos.includes(event.repo.name)),
  };
};
