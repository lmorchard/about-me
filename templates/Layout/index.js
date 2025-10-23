const { html } = require('../../lib/html');

module.exports = (children) => html`
  <div class="centered">
    <section class="cards">${children}</section>
  </div>
`;
