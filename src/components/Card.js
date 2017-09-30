import React from 'react';

import classnames from 'classnames';

export const Card = ({ children, theme, span }) => (
  <article className={classnames(
      'card',
      span && `span-${span}`,
      theme && `theme-${theme}`
  )}>
    {children}
  </article>
);

export default Card;
