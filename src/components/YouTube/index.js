import React from 'react';

import Card from '../Card';
import './index.scss';

const userUrl = (username) => `https://youtube.com/${username}`;
const videoUrl = ({ id: { videoId } }) => `https://www.youtube.com/watch?v=${videoId}`;

export class YouTube extends React.Component {
  render() {
    const { username, channelId, items } = this.props;
    const maxItems = this.props.maxItems || 12;

    return (
      <Card className="youtube" {...this.props}>
        <h3>
          YouTube Videos (<a rel="me" href={userUrl(username)}>{username}</a>)
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

  renderItem(video, idx) {
    const {
      id: { videoId },
      snippet: {
        title,
        thumbnails: {
          default: thumbnail
        }
      }
    } = video;
    return (
      <li key={idx} className="post">
        <a href={videoUrl(video)}>
          <img className="thumbnail" src={thumbnail.url} />
          <span className="title">{title}</span>
        </a>
      </li>
    );
  }
}

export default YouTube;
