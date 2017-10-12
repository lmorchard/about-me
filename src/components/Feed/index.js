import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

export class Feed extends React.Component {
  render() {
    const { name, title, feeds } = this.props;
    const maxItems = this.props.maxItems || 12;
    const seenUrls = new Set();

    // Merge, de-dupe, and sort items from all feeds.
    const items = feeds
      .reduce((acc, curr) => acc.concat(curr.items), [])
      .filter(item => {
        const { link } = item;
        const seen = seenUrls.has(link);
        seenUrls.add(link);
        return !seen;
      })
      .sort((a, b) => b.date.localeCompare(a.date));

    return (
      <Card {...this.props} className={classnames('feed', name)}>
        <h3>{title}</h3>
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
    const { title, summary, link, date } = item;
    const createMarkup = () => ({ __html: summary });
    return (
      <li key={idx} className="item">
        <a className="createdAt" href={link} title={date} dateTime={date}>
          {timeago().format(date)}
        </a>
        <a className="link" href={link}><span className="title">{title}</span></a>
        {summary && <div className="content" dangerouslySetInnerHTML={createMarkup()} />}
      </li>
    );
  }
}

export default Feed;
