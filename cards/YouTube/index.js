const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../content/Card");

module.exports = (props) => {
  const { username, channelId, items, className } = props;
  const maxItems = props.maxItems || 12;

  return Card(
    { ...props, className: "youtube" },
    html`
      <h3>
        YouTube Videos (<a rel="me" href="${userUrl(username)}">${username}</a>)
      </h3>
      <section>
        <ul>
          ${items.slice(0, maxItems).map((item, idx) => renderItem(item, idx))}
        </ul>
      </section>
    `
  );
};

const userUrl = (username) => `https://www.youtube.com/user/${username}/videos`;
const videoUrl = ({ id: { videoId } }) =>
  `https://www.youtube.com/watch?v=${videoId}`;

function renderItem(video, idx) {
  const {
    id: { videoId },
    snippet: {
      title,
      thumbnails: { default: thumbnail },
    },
  } = video;
  return html`
    <li key=${idx} className="post">
      <a href=${videoUrl(video)}>
        <img className="thumbnail" src=${thumbnail.url} />
        <span className="title">${title}</span>
      </a>
    </li>
  `;
}
