import { html, unescaped } from '../lib/html.js';
import classnames from 'classnames';

export default ({ theme, span, className }, children) => {
  const content = children();
  const flags = {};
  ['h3', 'h4'].forEach((t) => (flags[`has-${t}`] = content.includes(`<${t}`)));
  return html`
    <article
      class="${classnames(
        'card',
        span && `span-${span}`,
        theme && `theme-${theme}`,
        flags,
        className
      )}"
    >
      ${unescaped(content)}
    </article>
  `;
};
