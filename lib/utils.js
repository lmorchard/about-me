const fetch = require('node-fetch');

function mapFn(names, fn) {
  return names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: fn(name),
    }),
    {}
  );
}

function indexBy(items, keyFn) {
  const index = {};
  for (const item of items) {
    const key = keyFn(item);
    const keys = Array.isArray(key) ? key : [ key ];
    for (const k of keys) {
      if (k) index[k] = [...index[k] || [], item];
    }
  }
  return index;
}

// https://stackoverflow.com/a/48032528
async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

const all = Promise.all.bind(Promise);

const mapAll = (list, fn) => all(list.map(fn));

const pluck = spec => data => {
  const out = {};
  Object.keys(spec).forEach(name => {
    const mapper = spec[name];
    out[name] = typeof mapper === 'string' ? data[mapper] : mapper(data);
  });
  return out;
};

const params = params =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

const fetchJson = url =>
  fetch(
    url,
    {
      headers: {
        Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams", application/json'
      }
    }
  ).then(res => res.json());

module.exports = {
  mapFn,
  indexBy,
  replaceAsync,
  all,
  mapAll,
  params,
  pluck,
  fetchJson
};