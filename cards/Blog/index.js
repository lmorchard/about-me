import { html } from '../../lib/html.js';
import Card from '../../templates/Card.js';

export default (props) => {
  const { posts, siteTitle, baseURL } = props;
  const maxItems = props.maxItems || 9;

  return Card(
    { ...props, className: 'blog' },
    html`
      <h3>Blog (<a rel="me" href=${baseURL}>${siteTitle}</a>)</h3>
      <section>
        <ul>
          ${posts
            .slice(0, maxItems)
            .map((post, idx) => renderPost(post, baseURL, idx))}
        </ul>
      </section>
    `
  );
};

function renderPost({ title, _summary, thumbnail, _date, url }, baseURL, idx) {
  const thumbnailUrl = !!thumbnail
    ? thumbnail.indexOf('http') === 0
      ? thumbnail
      : `${baseURL}${thumbnail}`
    : 'https://blog.lmorchard.com/img/bullet-espresso.gif';
  return html`
    <li key="${idx}" class="post">
      <a href="${url}">
        <img class="thumbnail" title=${title} src=${thumbnailUrl} />
        <span class="title">${title}</span>
      </a>
    </li>
  `;
}
