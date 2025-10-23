const xml2js = require('xml2js');
const { promisify } = require('util');
const { mapAll } = require('../../lib/utils');

const parseString = promisify(xml2js.parseString);

module.exports = async function fetchData(config) {
  const { user_id, key } = config;
  const [user, reviews] = await mapAll(
    [
      `https://www.goodreads.com/user/show/${user_id}.xml?key=${key}`,
      `https://www.goodreads.com/review/list/${user_id}.xml?key=${key}&v=2`,
    ],
    async (url) => {
      const res = await fetch(url);
      const xml = await res.text();
      const data = await parseString(xml);
      return data.GoodreadsResponse;
    }
  );

  return {
    username: user.user[0].user_name[0],
    link: user.user[0].link[0],
    reviews: reviews.reviews[0].review.map((review) => ({
      title: review.book[0].title[0],
      image_url: review.book[0].image_url[0],
      link: review.book[0].link[0],
    })),
  };
};
