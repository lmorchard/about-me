import fetch from 'node-fetch';
import xml2js from 'xml2js';

const userUrl = ({ key, user_id }) =>
  `https://www.goodreads.com/user/show/${user_id}.xml?key=${key}`;

const reviewsUrl = ({ key, user_id }) =>
  `https://www.goodreads.com/review/list/${user_id}.xml?key=${key}&v=2`;

export default function fetchData(config) {
  return Promise.all([fetch(userUrl(config)), fetch(reviewsUrl(config))])
    .then(results => Promise.all(results.map(res => res.text())))
    .then(results =>
      Promise.all(
        results.map(
          xml =>
            new Promise((resolve, reject) =>
              xml2js.parseString(
                xml,
                (err, result) =>
                  err ? reject(err) : resolve(result.GoodreadsResponse)
              )
            )
        )
      )
    )
    .then(([user, reviews]) => ({
      user: user.user[0],
      reviews: reviews.reviews[0]
    }));
}
