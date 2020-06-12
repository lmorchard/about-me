const { html, unescaped } = require("../../lib/html");
const classnames = require("classnames");
const timeago = require("timeago.js");
const Card = require("../../templates/Card");

module.exports = (props) => {
  const { username, user, tracks } = props;
  const maxItems = props.maxItems || 10;

  return Card(
    { ...props, className: "spotify" },
    html`
      <h3>
        Spotify (<a
          rel="me"
          href="{user.external_urls.spotify}"
          title="{username}"
        >
          ${user.display_name} </a
        >)
      </h3>
      <section>
        <ul>
          ${tracks
            .slice(0, maxItems)
            .map((item, idx) => renderItem(item, username, idx))}
        </ul>
      </section>
    `
  );
};

function renderItem(item, username, idx) {
  const { played_at } = item;
  const { track } = item;
  const { album, artists } = track;
  const image = album.images.filter((i) => i.width === 64)[0];
  return html`
    <li key=${idx} class="item">
      <a href="${track.external_urls.spotify}" class="cover">
        ${image ? html`<img src=${image.url} />` : " "}
      </a>
      <span class="track">
        <a href="${track.external_urls.spotify}" class="name">
          ${track.name}
        </a>
        on
        <a href="${album.external_urls.spotify}" class="album">
          ${album.name}
        </a>
        by
        ${artists.map(
          (artist, idx) => html`
            <a
              key="{idx}"
              href="${artist.external_urls.spotify}"
              class="artist"
            >
              ${artist.name}
            </a>
            ${idx < artists.length - 1 ? ", " : ""}
          `
        )}
        <span class="playedAt" title="${played_at}" dateTime="${played_at}">
          ${timeago.format(played_at)}
        </span>
      </span>
      <span class="preview">
        <audio src="${track.preview_url}" controls preload="none" />
      </span>
    </li>
  `;
}
