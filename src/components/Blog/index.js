import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

export class Blog extends React.Component {
  render() {
    const { posts, siteTitle, baseURL } = this.props;
    return (
      <Card className="blog" {...this.props}>
        <h3>Blog (<a href={baseURL}>{siteTitle}</a>)</h3>
        <section>
          <ul>{posts.map((post, idx) => this.renderPost(post, idx))}</ul>
        </section>
      </Card>
    );
  }

  renderPost({ title, summary, thumbnail, date, url }, idx) {
    const { baseURL } = this.props;
    const thumbnailUrl = !!thumbnail
      ? thumbnail.indexOf('http') === 0 ? thumbnail : `${baseURL}${thumbnail}`
      : 'https://blog.lmorchard.com/favicon.ico';
    return (
      <li key={idx} className="post">
        <a href={`${baseURL}${url}`}>
          <img className="thumbnail" title={title} src={thumbnailUrl} />
          <span className="title">{title}</span>
        </a>
      </li>
    );
  }
}

export default Blog;