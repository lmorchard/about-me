import { html, unescaped } from '../../lib/html.js';
import classnames from 'classnames';
import * as commonmark from 'commonmark';

import Card from '../../templates/Card.js';

export default (props) => {
  const { title, src, className } = props;

  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(src);
  const content = writer.render(parsed);

  return Card(
    { ...props, className: classnames('bio', className) },
    html`
      <h3>${title}</h3>
      <section>
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
