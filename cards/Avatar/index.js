import { html } from '../../lib/html.js';
import classnames from 'classnames';
import Card from '../../templates/Card.js';

export default (props) => {
  const {
    title,
    avatarImage = 'https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=256',
    className,
  } = props;
  return html`
    ${Card(
      { ...props, className: classnames('avatar', className) },
    html`
      ${title && html`<h3>${title}</h3>`}
      <section>
        <img class="avatar" src="${avatarImage}" />
      </section>
    `
  )}
  `;
};
