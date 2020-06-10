const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async function fetchData(config) {
  const { url, title, contentSelector = "section.post-content" } = config;
  const resp = await fetch(url);
  const data = await resp.text();
  const $ = cheerio.load(data);

  return {
    title,
    url,
    content: $(contentSelector).html(),
  };
};
