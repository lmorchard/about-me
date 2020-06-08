import React from 'react';
import classnames from 'classnames';
import timeago from 'timeago.js';

import Card from '../Card';
import './index.scss';

export class Spotify extends React.Component {
  render() {
    const { username, user, tracks } = this.props;
    const maxItems = this.props.maxItems || 10;

    return (
      <Card className="spotify" {...this.props}>
        <h3>
          Spotify (<a rel="me" href={user.external_urls.spotify} title={username}>
            {user.display_name}
          </a>)
        </h3>
        <section>
          <ul>
            {tracks
              .slice(0, maxItems)
              .map((item, idx) => this.renderItem(item, idx))}
          </ul>
        </section>
      </Card>
    );
  }

  renderItem(item, idx) {
    const { username } = this.props;
    const { played_at } = item;
    const { track } = item;
    const { album, artists } = track;
    const image = album.images.filter(i => i.width === 64)[0];
    return (
      <li key={idx} className="item">
        <a href={track.external_urls.spotify} className="cover">
          {image ? <img src={image.url} /> : ' '}
        </a>
        <span className="track">
          "<a href={track.external_urls.spotify} className="name">
            {track.name}
          </a>"
          {' on '}
          <a href={album.external_urls.spotify} className="album">
            {album.name}
          </a>
          {' by '}
          {artists.map((artist, idx) => [
            <a key={idx} href={artist.external_urls.spotify} className="artist">
              {artist.name}
            </a>,
            idx < artists.length - 1 ? ', ' : ''
          ])}
          <span className="playedAt" title={played_at} dateTime={played_at}>
            {timeago().format(played_at)}
          </span>
        </span>
        <span className="preview">
          <audio src={track.preview_url} controls preload="none" />
        </span>
      </li>
    );
  }
}

export default Spotify;
