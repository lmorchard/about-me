const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../templates/Card");

module.exports = ({
  title,
  avatarImage = "https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=256",
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
