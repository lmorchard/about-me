const { html, unescaped } = require("../../lib/html");
const twitterText = require("twitter-text");
const timeago = require("timeago.js");
const url = require("url");
const Card = require("../../templates/Card");

const BASE_URL = "https://twitter.com";

module.exports = (props) => {
  const { username, statuses, theme } = props;
  const maxItems = props.maxItems || 12;
  const displayName = statuses[0].user.name;

  return Card(
    { ...props, className: "twitter" },
    html`
      <h3>
        Twitter (<a rel="me" href="${BASE_URL}/${username}" title="${username}">
          ${displayName} </a
        >)
      </h3>
      <section>
        <ul>
          ${statuses
            .slice(0, maxItems)
            .map((status, idx) => renderStatus(username, status, idx))}
        </ul>
      </section>
    `
  );
};

const renderStatus = (username, status, idx) => html`
  <li key="${idx}" class="status">
    ${renderCreatedAt(username, status)} ${renderText(status)}
  </li>
`;

const renderText = ({ text, entities }) => html`
  <span>
    ${unescaped(twitterText.autoLink(text, { urlEntities: entities.urls }))}
  </span>
`;

const renderCreatedAt = (username, { id_str, created_at }) => html`
  <a
    class="createdAt"
    href="${BASE_URL}/${username}/status/${id_str}"
    title="${created_at}"
    dateTime="${created_at}"
  >
    ${timeago.format(created_at)}
  </a>
`;
