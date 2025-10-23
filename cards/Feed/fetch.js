const Parser = require('rss-parser');

module.exports = async function fetchData(config, name) {
  const { title, link, feedUrls } = config;
  const parser = new Parser();

  const feeds = await Promise.all(
    feedUrls.map(async (feedUrl) => {
      try {
        const feed = await parser.parseURL(feedUrl);
        return {
          name,
          title,
          meta: {
            title: feed.title,
            description: feed.description,
            link: feed.link,
            feedUrl: feed.feedUrl,
          },
          items: feed.items || [],
        };
      } catch (error) {
        console.error(`Failed to parse feed ${feedUrl}:`, error.message);
        return {
          name,
          title,
          meta: {},
          items: [],
          error: error.message,
        };
      }
    })
  );

  return { name, title, link, feedUrls, feeds };
};
