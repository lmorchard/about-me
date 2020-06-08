const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../content/Card");

module.exports = (props) => {
  const { posts, siteTitle, baseURL } = props;
  const maxItems = props.maxItems || 9;

  return Card(
    { ...props, className: "blog" },
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

function renderPost({ title, summary, thumbnail, date, url }, baseURL, idx) {
  const thumbnailUrl = !!thumbnail
    ? thumbnail.indexOf("http") === 0
      ? thumbnail
      : `${baseURL}${thumbnail}`
    : "https://blog.lmorchard.com/favicon.ico";
  return html`
    <li key="{idx}" className="post">
      <a href=${`${baseURL}${url}`}>
        <img className="thumbnail" title=${title} src=${thumbnailUrl} />
        <span className="title">${title}</span>
      </a>
    </li>
  `;
}
