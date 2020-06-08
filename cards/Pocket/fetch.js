import fetch from 'node-fetch';
import { pluck, params } from '../../lib/utils';

export default async function fetchData(config) {
  const { username, consumer_key, access_token } = config;
  const maxItems = config.maxItems || 20;

  const url = 'https://getpocket.com/v3/get?' + params({
    consumer_key,
    access_token,
    favorite: 1,
    sort: 'newest',
    detailType: 'complete'
  });

  const res = await fetch(url);
  const data = await res.json();

  const items = Object.values(data.list)
    .sort((a, b) => b.time_updated - a.time_updated)
    .slice(0, maxItems)
    .map(
      pluck({
        title: 'resolved_title',
        link: 'resolved_url',
        added: 'time_added',
        updated: 'time_updated',
        excerpt: 'excerpt',
        image: item => item.image && item.image.src
      })
    );

  return { username, items };
}
