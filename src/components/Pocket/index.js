import React from 'react';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

const BLANK_IMG = "https://getpocket.com/i/v4/shared_emptyimage@1x.png";

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
    const { title, link, ago, excerpt, image } = item;
    const style = {
      backgroundImage: `url(${image || BLANK_IMG})`
    };
    return (
      <li key={idx} className="item" style={style}>
        <span className="createdAt">
          {ago}
        </span>
        <a href={link} className="title">
          {title}
        </a>
        <p className="excerpt">{excerpt}</p>
      </li>
    );
  }
}

export default Pocket;
