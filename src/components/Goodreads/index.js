import React from 'react';

import Card from '../Card';
import './index.scss';

export class Goodreads extends React.Component {
  render() {
    const user = this.props.user;
    const username = user.user_name[0];
    const link = user.link[0];
    const reviews = this.props.reviews.review;

    return (
      <Card className="goodreads" {...this.props}>
        <h3>
          Goodreads (<a href={link}>{username}</a>)
        </h3>
        <section>
          <ul>
            {reviews.map((review, idx) => this.renderReview(review, idx))}
          </ul>
        </section>
      </Card>
    );
  }

  renderReview(review, idx) {
    const book = review.book[0];
    const title = book.title[0];
    const image_url = book.image_url[0];
    const link = book.link[0];

    return (
      <li key={idx} className="review">
        <a href={link}>
          <img src={image_url} title={title} />
        </a>
      </li>
    );
  }
}

export default Goodreads;
