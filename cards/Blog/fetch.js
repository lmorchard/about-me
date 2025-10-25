const cmp = (a, b) => a.localeCompare(b);

export default async function fetchData(config) {
  const { siteTitle, baseURL, indexURL } = config;
  const maxPosts = config.maxPosts || 15;

  const resp = await fetch(indexURL);
  const posts = await resp.json();
  return {
    siteTitle,
    baseURL,
    posts: posts
      .slice(0, maxPosts)
      .sort((b, a) => cmp(a.date, b.date))
      .map(({ title, summary, thumbnail, date, path }) => ({
        title,
        summary,
        thumbnail,
        date,
        url: `${baseURL}/${path}`,
      })),
  };
};
