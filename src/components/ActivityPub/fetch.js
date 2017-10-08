import fetch from 'node-fetch';

export default async function fetchData(config, name) {
  const { username, baseUrl, profileUrl, outboxUrl } = config;
  const res = await fetch(outboxUrl);
  const outbox = await res.json();

  return { name, username, baseUrl, profileUrl, outbox };
}
