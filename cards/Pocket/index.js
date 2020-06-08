import React from 'react';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

export class Pocket extends React.Component {
  render() {
    const { username, items } = this.props;
    const maxItems = this.props.maxItems || 10;

    const profileURL = `https://getpocket.com/@${username}`;
    return (
      <Card className="pocket" {...this.props}>
        <h3>
          Pocket (<a href={profileURL}>@{username}</a>)
        </h3>
        <section>
          <ul>{items.slice(0, maxItems).map((item, idx) => this.renderItem(item, idx))}</ul>
        </section>
      </Card>
    );
  }

  renderItem(item, idx) {
    const { title, link, added, updated, excerpt, image } = item;

    const updatedAdj = updated * 1000;

    return (
      <li key={idx} className="item">
        {image && <img src={image} title={title} />}
        <div>
          <span className="createdAt">
            {timeago().format(updatedAdj)}
          </span>
          <a href={link} className="title">
            {title}
          </a>
          <p className="excerpt">{excerpt}</p>
        </div>
      </li>
    );
  }
}

export default Pocket;
