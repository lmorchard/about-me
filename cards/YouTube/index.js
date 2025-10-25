import { html } from '../../lib/html.js';
import Card from '../../templates/Card.js';

export default (props) => {
  const { username, items, error } = props;
  const maxItems = props.maxItems || 12;

  return Card(
    { ...props, className: 'youtube' },
    html`
      <h3>
        YouTube Videos (<a rel="me" href="${userUrl(username)}">${username}</a>)
      </h3>
      <section>
        ${items &&
        html`
          <ul>
            ${items
              .slice(0, maxItems)
              .map((item, idx) => renderItem(item, idx))}
          </ul>
        `}
        ${error && html` <p>Fetch failed: ${error.message}</p> `}
      </section>
    `
  );
};

const userUrl = (username) => `https://www.youtube.com/user/${username}/videos`;
const videoUrl = ({ id: { videoId } }) =>
  `https://www.youtube.com/watch?v=${videoId}`;

function renderItem(video, idx) {
  const {
    snippet: {
      title,
      thumbnails: { default: thumbnail },
    },
  } = video;
  return html`
    <li key=${idx} class="post">
      <a href=${videoUrl(video)}>
        <img class="thumbnail" src=${thumbnail.url} />
        <span class="title">${title}</span>
      </a>
    </li>
  `;
}
