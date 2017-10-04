import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';
import twitterText from 'twitter-text';

import Card from '../Card';
import './index.scss';

const BASE_URL = 'https://twitter.com';

export class Twitter extends React.Component {
  render() {
    const { username, statuses, theme } = this.props;
    const displayName = statuses[0].user.name;
    return (
      <Card className="twitter" theme={theme}>
        <h3>
          Twitter (<a href={`${BASE_URL}/${username}`} title={username}>
            {displayName}
          </a>)
        </h3>
        <section>
          <ul>
            {statuses.map((status, idx) => this.renderStatus(status, idx))}
          </ul>
        </section>
      </Card>
    );
  }

  renderStatus(status, idx) {
    return (
      <li key={idx} className="status">
        {this.renderText(status)} {this.renderCreatedAt(status)}
      </li>
    );
  }

  renderText(status) {
    const { text, entities } = status;
    const createMarkup = () => ({
      __html: twitterText.autoLink(text, { urlEntities: entities.urls })
    });
    return <span dangerouslySetInnerHTML={createMarkup()} />;
  }

  renderCreatedAt(status) {
    const { username } = this.props;
    const { id_str, created_at } = status;
    return (
      <a
        className="createdAt"
        href={`${BASE_URL}/${username}/status/${id_str}`}
        title={created_at}
        dateTime={created_at}
      >
        {timeago().format(created_at)}
      </a>
    );
  }
}

export default Twitter;
