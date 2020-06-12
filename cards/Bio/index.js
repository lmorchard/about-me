const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const commonmark = require("commonmark");

const Card = require("../../templates/Card");

module.exports = (props) => {
  const { title, src, className } = props;

  const reader = new commonmark.Parser();
  const writer = new commonmark.HtmlRenderer();
  const parsed = reader.parse(src);
  const content = writer.render(parsed);

  return Card(
    { ...props, className: classnames("bio", className) },
    html`
      <h3>${title}</h3>
      <section>
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
