import fetch from 'node-fetch';
import cheerio from 'cheerio';

export default async function fetchData(config) {
  const { username, consumer_key, access_token } = config;
  const maxItems = config.maxItems || 20;

  const url = `https://getpocket.com/@${username}`;
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const items = $('.sprofile-content .sprofile-post')
    .map((idx, srcEl) => {
      const el = $(srcEl);
      return ({
        title: el.find('.sprofile-article-title').text(),
        link: el.find('.sprofile-article-link').attr('href'),
        excerpt: el.find('.sprofile-attribution-quote').text(),
        ago: el.find('.sprofile-post-time').text(),
        image: el.find('.sprofile-article-img').attr('data-bgimg'),
      });
    })
    .get();

  return { username, items };
}
