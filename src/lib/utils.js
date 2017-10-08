export const all = Promise.all.bind(Promise);

export const map = (list, fn) => all(list.map(fn));

export const pluck = spec => data => {
  const out = {};
  Object.keys(spec).forEach(name => {
    const mapper = spec[name];
    out[name] = typeof mapper === 'string' ? data[mapper] : mapper(data);
  });
  return out;
};

export const params = params =>
  Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
