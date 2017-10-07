import fetch from 'node-fetch';
import xml2js from 'xml2js';
import { promisify } from 'util';
import { all, map } from '../../lib/utils';

const parseString = promisify(xml2js.parseString);

const userUrl = ({ key, user_id }) =>
  `https://www.goodreads.com/user/show/${user_id}.xml?key=${key}`;

const reviewsUrl = ({ key, user_id }) =>
  `https://www.goodreads.com/review/list/${user_id}.xml?key=${key}&v=2`;

export default async function fetchData(config) {
  const [user, reviews] = await map([userUrl, reviewsUrl], async urlFn => {
    const url = urlFn(config);
    const res = await fetch(url);
    const xml = await res.text();
    const data = await parseString(xml);
    return data.GoodreadsResponse;
  });

  return {
    username: user.user[0].user_name[0],
    link: user.user[0].link[0],
    reviews: reviews.reviews[0].review.map(review => ({
      title: review.book[0].title[0],
      image_url: review.book[0].image_url[0],
      link: review.book[0].link[0]
    }))
  };
}
