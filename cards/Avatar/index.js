const { html } = require("../../lib/html");
const classnames = require("classnames");
const Card = require("../../templates/Card");

// import AvatarImage from './me.jpg';

module.exports = ({ title, className }) => html`
  ${Card(
    { ...this.props, className: classnames("avatar", className) },
    html`
      ${title && html`<h3>${title}</h3>`}
      <section>
        <img class="avatar" src="{AvatarImage}" />
      </section>
    `
  )}
`;
