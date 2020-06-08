const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");

const timeago = require("timeago.js");
const url = require("url");

const Card = require("../../content/Card");

// import FeedIcon from './icon.svg';

module.exports = (props) => {
  const { name, title, feeds, link, feedUrls } = props;
  const maxItems = props.maxItems || 12;
  const seenUrls = new Set();

  // Merge, de-dupe, and sort items from all feeds.
  const items = feeds
    .reduce((acc, curr) => acc.concat(curr.items), [])
    .filter((item) => {
      const { link } = item;
      const seen = seenUrls.has(link);
      seenUrls.add(link);
      return !seen;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return Card(
    { ...props, className: classnames("feed", name) },
    html`
      <h3>
        ${link ? html`<a href=${link}>${title}</a>` : title}
        ${feedUrls.map(
          (url, idx) => html`
            <a key=${idx} href=${url}>
              <img className="feedIcon" src="{FeedIcon}" />
            </a>
          `
        )}
      </h3>
      <section>
        <ul>
          ${items.slice(0, maxItems).map((item, idx) => renderItem(item, link, idx))}
        </ul>
      </section>
    `
  );
};

function renderItem(item, baseLink, idx) {
  const { title, summary, link, date } = item;
  const absLink = url.resolve(baseLink, link);
  return html`
    <li key=${idx} className="item">
      <a className="createdAt" href=${link} title=${date} dateTime=${date}>
        ${timeago.format(date)}
      </a>
      <a className="link" href=${absLink}>
        <span className="title">${title}</span>
      </a>
      ${summary && html` <div className="content">${unescaped(summary)}</div> `}
    </li>
  `;
}
