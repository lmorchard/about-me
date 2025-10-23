const { html, unescaped } = require('../../lib/html');
const classnames = require('classnames');
const Card = require('../../templates/Card');

module.exports = (props) => {
  const { username, link, reviews, className } = props;
  const maxItems = props.maxItems || 15;

  return Card(
    { ...props, className: classnames('goodreads', className) },
    html`
      <h3>Goodreads (<a href=${link}>${username}</a>)</h3>
      <section>
        <ul>
          ${reviews
            .slice(0, maxItems)
            .map((review, idx) => renderReview(review, idx))}
        </ul>
      </section>
    `
  );
};

function renderReview(review, idx) {
  const { title, image_url, link } = review;

  return html`
    <li key=${idx} className="review">
      <a href=${link}>
        <img src=${image_url} title=${title} />
      </a>
    </li>
  `;
}
