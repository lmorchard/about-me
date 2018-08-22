import fetch from 'node-fetch';
import { map, fetchJson } from '../../lib/utils';

export default async function fetchData(config, name) {
  const { username, baseUrl, profileUrl, outboxUrl } = config;
  const outbox = await fetchJson(outboxUrl);

  outbox.orderedItems = await map(outbox.orderedItems, async item => {
    // HACK: Dereference retoots by fetching them
    if (item.type === "Announce") {
      item.objectUri = item.object;
      item.object = (await fetchJson(`${item.object}/activity`)).object;
    }
    return { ...item };
  });

  return { name, username, baseUrl, profileUrl, outbox };
}
