import { html } from '../../lib/html.js';

import Card from '../../templates/Card.js';

const CDN_URL = 'https://cdn.glitch.com';
const userUrl = ({ login }) => `https://glitch.com/@${login}`;
const projectAvatar = ({ id }) => `${CDN_URL}/project-avatar/${id}.png`;
const projectUrl = ({ domain }) => `https://glitch.com/~${domain}`;

export default (props) => {
  const { login, user } = props;
  const { projects } = user;

  return Card(
    { ...props, className: 'glitch' },
    html`
      <h3>
        Glitch Projects (<a rel="me" href="${userUrl(user)}">${login}</a>)
      </h3>
      <section>
        <ul>
          ${projects
            .filter((project) => !project.private)
            .map((project, idx) => renderProject(project, idx))}
        </ul>
      </section>
    `
  );
};

function renderProject(project, idx) {
  const { description, domain } = project;
  return html`
    <li key=${idx} class="post">
      <a href=${projectUrl(project)}>
        <img class="thumbnail" title=${domain} src=${projectAvatar(project)} />
        <span class="title">${domain}</span>
        <p class="description">
          <span>${description}</span>
        </p>
      </a>
    </li>
  `;
}
