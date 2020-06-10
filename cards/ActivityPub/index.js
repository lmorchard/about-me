const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const timeago = require("timeago.js");
const Card = require("../../content/Card");

module.exports = (props) => {
  const { name, username, baseUrl, profileUrl, outbox } = props;
  const maxItems = props.maxItems || 12;
  const items = outbox.orderedItems;

  return Card(
    { ...props, className: `activitypub ${name}` },
    html`
      <h3>
        ${name} (<a href=${profileUrl} rel="me" title=${username}
          >@${username}</a
        >)
      </h3>
      <section>
        <ul>
          ${items.slice(0, maxItems).map((item, idx) => renderItem(item, idx))}
        </ul>
      </section>
    `
  );
};

function renderItem(item, idx) {
  const { type, object } = item;
  const { published, url } = object;
  if (type in itemTypeTemplates) {
    return html`
      <li key="${idx}" class="${classnames("item", type)}">
        <a
          class="createdAt"
          href="${url}"
          title="${published}"
          dateTime="${published}"
        >
          ${timeago.format(published)}
        </a>
        ${itemTypeTemplates[type](item, idx)}
      </li>
    `;
  }
}

const itemTypeTemplates = {
  Create: function renderCreateItem(item, idx) {
    const { type, object } = item;
    const { published, url, content } = object;
    return html`<div class="content">${unescaped(content)}</div>`;
  },
  Announce: function renderAnnounceItem(item, idx) {
    const { type, object } = item;
    const { published, url, content, attributedTo } = object;
    return html`
      <span key="0" class="retooted">
        retooted <a href="${attributedTo}">${attributedTo}</a>
      </span>
      <div class="content">${unescaped(content)}</div>
    `;
  },
};
