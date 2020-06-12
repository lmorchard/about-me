const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const commonmark = require("commonmark");

const Card = require("../../templates/Card");

module.exports = (props, children) => {
  const { title, link, src = "", thumbnail, video, iframe, className } = props;

  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(src);
  const content = writer.render(parsed);

  return Card(
    { ...props, className: classnames("project", className) },
    html`
      <h3>Project: <a href=${link}>${title}</a></h3>
      <section>
        ${thumbnail &&
        html`
          <a class="thumbnail" href=${link}>
            <img src=${thumbnail} />
          </a>
        `}
        ${video &&
        html`
          <div class="video">
            <video
              controls="true"
              loop="true"
              preload="metadata"
              src="${video}"
            />
          </div>
        `}
        ${iframe &&
        html`
          <div class="iframe">
            <iframe frameborder="0" scrolling="no" src="${iframe}"></iframe>
          </div>
        `}
        ${children}
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
