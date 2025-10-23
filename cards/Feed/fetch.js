const FeedParser = require('feedparser');
const { Readable } = require('stream');

module.exports = async function fetchData(config, name) {
  const { title, link, feedUrls } = config;

  return Promise.all(
    feedUrls.map(async (feedUrl) => {
      const res = await fetch(feedUrl);
      return new Promise((resolve, reject) => {
        const feed = { name, title, meta: {}, items: [] };

        // Convert Web ReadableStream to Node.js stream
        const nodeStream = Readable.fromWeb(res.body);

        nodeStream
          .on('error', (error) => reject(error))
          .pipe(new FeedParser())
          .on('error', (error) => reject(error))
          .on('meta', (meta) => (feed.meta = meta))
          .on('readable', function () {
            const stream = this;
            let item;
            while ((item = stream.read())) {
              feed.items.push(item);
            }
          })
          .on('end', () => resolve(feed));
      });
    })
  ).then((feeds) => ({ name, title, link, feedUrls, feeds }));
};
