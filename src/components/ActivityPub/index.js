import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

export class ActivityPub extends React.Component {
  render() {
    const { name, username, baseUrl, profileUrl, outbox } = this.props;
    const maxItems = this.props.maxItems || 12;
    const items = outbox.orderedItems;

    return (
      <Card {...this.props} className={classnames('activitypub', name)}>
        <h3>
          {name} (<a href={profileUrl} title={username}>@{username}</a>)
        </h3>
        <section>
          <ul>
            {items
              .slice(0, maxItems)
              .map((item, idx) => this.renderItem(item, idx))}
          </ul>
        </section>
      </Card>
    );
  }

  renderItem(item, idx) {
    const { type, object } = item;
    const { published, url } = object;
    const methodName = `render${type}Item`;
    if (methodName in this) {
      return (
        <li key={idx} className={classnames('item', type)}>
          <a className="createdAt" href={url} title={published} dateTime={published}>
            {timeago().format(published)}
          </a>
          {this[methodName](item, idx)}
        </li>
      );
    }
  }

  renderCreateItem(item, idx) {
    const { type, object } = item;
    const { published, url, content } = object;
    const createMarkup = () => ({ __html: content });
    return [
      <div className="content" dangerouslySetInnerHTML={createMarkup()} />,
    ];
  }

  renderAnnounceItem(item, idx) {
    const { type, object } = item;
    const { published, url, content, attributedTo } = object;
    const createMarkup = () => ({ __html: content });
    return [
      <span class="retooted">retooted <a href={attributedTo}>{attributedTo}</a></span>,
      <div className="content" dangerouslySetInnerHTML={createMarkup()} />,
    ];
  }
}

export default ActivityPub;
