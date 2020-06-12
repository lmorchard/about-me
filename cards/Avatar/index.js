const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../templates/Card");

module.exports = ({
  title,
  avatarImage = "./assets/avatar.jpg",
  className,
}) => html`
  ${Card(
    { ...this.props, className: classnames("avatar", className) },
    html`
      ${title && html`<h3>${title}</h3>`}
      <section>
        <img class="avatar" src="${avatarImage}" />
      </section>
    `
  )}
`;
