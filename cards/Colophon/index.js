const { html } = require('../../lib/html');
const classnames = require('classnames');
const Card = require('../../templates/Card');

module.exports = (props) => {
  const {
    title = 'Colophon',
    repoUrl = 'https://github.com/lmorchard/about-me',
    className,
    fetched,
  } = props;
  const rendered = new Date();

  return Card(
    { ...props, className: classnames('colophon', className) },
    html`
      <h3>${title}</h3>
      <section>
        <div class="text">
          <p>
            This is a static web page hosted on Amazon S3. It is periodically
            updated via a scheduled Github Action that fetches data from many
            sources on the web.
          </p>
          <dl>
            <dt>Source code:</dt>
            <dd><a href="${repoUrl}">${repoUrl}</a></dd>
            <dt>Last fetched:</dt>
            <dd>${new Date(fetched).toISOString()}</dd>
            <dt>Last rendered:</dt>
            <dd>${new Date(rendered).toISOString()}</dd>
          </dl>
        </div>
      </section>
    `
  );
};
