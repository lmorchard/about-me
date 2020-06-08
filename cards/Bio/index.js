const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const commonmark = require("commonmark");

const Card = require("../../content/Card");

module.exports = ({ title, src, className }) => {
  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(src);
  const content = writer.render(parsed);

  return Card(
    { ...this.props, className: classnames("bio", className) },
    html`
      <h3>${title}</h3>
      <section>
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
