import { html, unescaped } from '../../lib/html.js';
import classnames from 'classnames';
import Card from '../../templates/Card.js';

export default (props, children) => {
  const { url, link, title, content, className } = props;

  return Card(
    { ...props, className: classnames('note', className) },
    html`
      <h3><a href="${link || url}">${title}</a></h3>
      <section>
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
