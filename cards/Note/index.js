const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../templates/Card");

module.exports = (props, children) => {
  const { url, title, content, className } = props;

  return Card(
    { ...props, className: classnames("note", className) },
    html`
      <h3><a href=${url}>${title}</a></h3>
      <section>
        <div class="text">${unescaped(content)}</div>
      </section>
    `
  );
};
