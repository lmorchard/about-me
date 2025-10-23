const { html, unescaped } = require('../lib/html');
const classnames = require('classnames');

module.exports = ({ theme, span, className }, children) => {
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
