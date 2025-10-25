import { html } from '../../lib/html.js';

export default (children) => html`
  <div class="centered">
    <section class="cards">${children}</section>
  </div>
`;
