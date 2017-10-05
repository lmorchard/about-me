import fetch from 'node-fetch';

const cmp = (a, b) => a.localeCompare(b);

export default function fetchData(config) {
  const { siteTitle, baseURL, dateIndexURL } = config;
  const maxDates = config.maxDates || 30;
  const maxPosts = config.maxPosts || 15;

  return fetch(dateIndexURL)
    .then(res => res.json())
    .then(dateIndex =>
      Promise.all(
        Object.keys(dateIndex)
          .sort((b, a) => cmp(a, b))
          .slice(0, maxDates)
          .reduce((acc, dateKey) => acc.concat(dateIndex[dateKey]), [])
          .slice(0, maxPosts)
          .map(path => fetch(`${baseURL}/${path}.json`))
      )
    )
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(posts => ({
      siteTitle,
      baseURL,
      posts: posts
        .sort((b, a) => cmp(a.date, b.date))
        .map(({ title, summary, thumbnail, date, url }) => ({
          title,
          summary,
          thumbnail,
          date,
          url
        }))
    }));
}
