import React from 'react';

import classnames from 'classnames';

export const Card = ({ children, theme, span, className }) => {
  const flags = {};
  if (Array.isArray(children)) {
    ['h3', 'h4'].forEach(t => {
      flags[`has-${t}`] = children.filter(e => e.type === t).length > 0;
    });
  }
  return (
    <article className={classnames(
        'card',
        span && `span-${span}`,
        theme && `theme-${theme}`,
        flags,
        className
    )}>{children}</article>
  )
};

export default Card;
