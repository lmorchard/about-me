const url = require('url');
const cheerio = require('cheerio');

module.exports = async function fetchData(config) {
  const {
    url: noteUrl,
    title,
    baseUrl = 'https://lmorchard.github.io/notes/',
    contentSelector = 'section.post-content',
  } = config;
  const resp = await fetch(noteUrl);
  const data = await resp.text();
  const $ = cheerio.load(data);

  // HACK: make all the relative links absolute with respect to the notes base URL
  $('a').each((idx, _el) => {
    const el = $(_el);
    const href = el.attr('href');
    const absHref = url.resolve(baseUrl, href);
    el.attr('href', absHref);
  });

  return {
    title,
    url: noteUrl,
    content: $(contentSelector).html(),
  };
};
