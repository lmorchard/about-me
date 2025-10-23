const { html } = require('../../lib/html');

module.exports = ({ title }) => html`
  <header>
    <h1>${title}</h1>
  </header>
`;
