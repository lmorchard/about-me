export const all = Promise.all.bind(Promise);

export const map = (list, fn) => all(list.map(fn));
