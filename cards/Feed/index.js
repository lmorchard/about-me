const { html, unescaped } = require('../../lib/html');
const classnames = require('classnames');

const timeago = require('timeago.js');
const url = require('url');

const Card = require('../../templates/Card');

// import FeedIcon from './icon.svg';

module.exports = (props) => {
  const {
    name,
    title,
    feeds,
    link,
    feedUrls,
    feedIcon = 'assets/feedicon.svg',
  } = props;
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
    .sort((a, b) => {
      // rss-parser uses isoDate, fallback to pubDate or date
      const dateA = a.isoDate || a.pubDate || a.date || '';
      const dateB = b.isoDate || b.pubDate || b.date || '';
      return dateB.localeCompare(dateA);
    });

  return Card(
    { ...props, className: classnames('feed', name) },
    html`
      <h3>
        ${link ? html`<a href="${link}">${title}</a>` : title}
        ${feedUrls.map(
          (url, idx) => html`
            <a key="${idx}" href="${url}">
              <img class="feedIcon" src="${feedIcon}" />
            </a>
          `
        )}
      </h3>
      <section>
        <ul>
          ${items
            .slice(0, maxItems)
            .map((item, idx) => renderItem(item, link, idx))}
        </ul>
      </section>
    `
  );
};

function renderItem(item, baseLink, idx) {
  // rss-parser uses different field names than feedparser
  const title = item.title || '';
  const link = item.link || '';
  const date = item.isoDate || item.pubDate || item.date || '';
  const summary =
    item.contentSnippet || item.summary || item.content || item.description;

  const absLink = url.resolve(baseLink, link);
  return html`
    <li key=${idx} class="item">
      <a class="createdAt" href=${link} title=${date} dateTime=${date}>
        ${timeago.format(date)}
      </a>
      <a class="link" href=${absLink}>
        <span class="title">${title}</span>
      </a>
      ${summary && html` <div class="content">${unescaped(summary)}</div> `}
    </li>
  `;
}
