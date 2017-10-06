import React from 'react';
import { hydrate } from 'react-dom';

import Counter from '../components/Counter';

const mounts = [
  ['counter1', <Counter />],
  ['counter2', <Counter />],
  ['counter3', <Counter />],
  ['counter4', <Counter />]
];

mounts.forEach(([id, component]) =>
  hydrate(component, document.getElementById(id))
);
