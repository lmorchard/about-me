const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../content/Card");

module.exports = (props) => {
  const { username, clips, className } = props;
  const maxItems = props.maxItems || 12;

  return Card(
    { ...props, className: "twitch" },
    html`
      <h3>
        Twitch Clips (<a rel="me" href="${userUrl(username)}">${username}</a>)
      </h3>
      <section>
        <ul>
          ${clips
            .sort((a, b) => b.created_at.localeCompare(a.created_at))
            .slice(0, maxItems)
            .map((item, idx) => renderClip(item, idx))}
        </ul>
      </section>
    `
  );
};

const userUrl = (username) => `https://twitch.tv/${username}`;

const renderClip = ({ url, title, thumbnail_url }, idx) => html`
  <li key=${idx} class="post">
    <a href="${url}">
      <img class="thumbnail" src=${thumbnail_url} />
      <span class="title">${title}</span>
    </a>
  </li>
`;
