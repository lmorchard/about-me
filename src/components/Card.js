import React from 'react';

import classnames from 'classnames';

export const Card = ({ children, width }) => (
  <article className={classnames('card', `width-${width}`)}>
    {children}
  </article>
);

export default Card;
