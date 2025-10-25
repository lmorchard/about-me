import { html } from '../../lib/html.js';
import classnames from 'classnames';
import timeago from 'timeago.js';
import Card from '../../templates/Card.js';

export default (props) => {
  const { email, episodes } = props;
  const maxItems = props.maxItems || 10;

  if (!episodes || episodes.length === 0) {
    return '';
  }

  return Card(
    { ...props, className: 'pocketcasts' },
    html`
      <h3>Pocket Casts</h3>
      <section>
        <ul>
          ${episodes
            .slice(0, maxItems)
            .map((episode, idx) => renderEpisode(episode, idx))}
        </ul>
      </section>
    `
  );
};

function renderEpisode(episode, idx) {
  const { podcast, episode: episodeData } = episode;

  return html`
    <li key="${idx}" class="item">
      ${podcast.thumbnail
        ? html`<a href="${podcast.url || '#'}" class="cover">
            <img src="${podcast.thumbnail}" alt="${podcast.title}" />
          </a>`
        : ''}
      <span class="episode-info">
        ${episodeData.url
          ? html`<a href="${episodeData.url}" class="episode-title">
              ${episodeData.title}
            </a>`
          : html`<span class="episode-title"> ${episodeData.title} </span>`}
        from
        <a href="${podcast.url || '#'}" class="podcast-title">
          ${podcast.title}
        </a>
        ${episode.lastPlayedAt
          ? html`<span
              class="playedAt"
              title="${episode.lastPlayedAt}"
              dateTime="${episode.lastPlayedAt}"
            >
              ${timeago.format(episode.lastPlayedAt)}
            </span>`
          : ''}
      </span>
      ${episodeData.url
        ? html`<span class="preview">
            <audio src="${episodeData.url}" controls preload="none" />
          </span>`
        : ''}
    </li>
  `;
}
