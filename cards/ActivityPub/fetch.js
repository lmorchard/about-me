import { mapAll, fetchJson } from '../../lib/utils.js';

export default async function fetchData(config, name) {
  const { username, baseUrl, profileUrl, outboxUrl } = config;
  const outbox = await fetchJson(outboxUrl);

  const items = await mapAll(outbox.orderedItems, async (item) => {
    try {
      // HACK: Dereference retoots by fetching them
      if (item.type === 'Announce') {
        item.objectUri = item.object;
        item.object = await fetchJson(item.object);
      }
      return { ...item };
    } catch (e) {
      /* no-op */
    }
  });
  outbox.orderedItems = items.filter((item) => !!item);

  return { name, username, baseUrl, profileUrl, outbox };
};
