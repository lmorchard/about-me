import { html, unescaped } from '../lib/html.js';
import fs from 'fs';

import Header from './Header/index.js';
import Layout from './Layout/index.js';

import Avatar from '../cards/Avatar/index.js';
import Note from '../cards/Note/index.js';
import Bio from '../cards/Bio/index.js';
import YouTube from '../cards/YouTube/index.js';
import Feed from '../cards/Feed/index.js';
import Blog from '../cards/Blog/index.js';
import Project from '../cards/Project/index.js';
import Github from '../cards/Github/index.js';
import Glitch from '../cards/Glitch/index.js';
import Goodreads from '../cards/Goodreads/index.js';
import PocketCasts from '../cards/PocketCasts/index.js';
import Spotify from '../cards/Spotify/index.js';
import Twitch from '../cards/Twitch/index.js';
import ActivityPub from '../cards/ActivityPub/index.js';
import Colophon from '../cards/Colophon/index.js';

export default ({ config, data }) => html`
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1" />
      <title>${config.siteTitle}</title>
      <link href="./index.css" rel="stylesheet" />
      <link
        rel="shortcut icon"
        href="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=16"
      />
    </head>
    <body>
      <div id="root">
        <article>
          ${Header({ title: 'Les Orchard <me@lmorchard.com>' })}
          ${Layout(html`
            ${Avatar({ theme: theme(), title: "That's me!" })}
            ${Bio({
              theme: theme(),
              title: 'About Me',
              src: fs.readFileSync('./content/bio.md', 'utf-8'),
            })}
            ${Blog({ theme: theme(), ...data.Blog })}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Links })}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Fediverse })}
            ${Github({ theme: theme(), maxItems: 7, ...data.Github })}
            ${YouTube({ theme: theme(), maxItems: 12, ...data.YouTube })}
            ${PocketCasts({
              theme: theme(),
              maxItems: 12,
              ...data.PocketCasts,
            })}
            ${Spotify({ theme: theme(), maxItems: 7, ...data.Spotify })}
            ${Colophon({ theme: theme(), ...data.Colophon })}
          `)}
        </article>
      </div>
    </body>
  </html>
`;

const themes = [
  'default',
  'primary',
  'secondary-1',
  'secondary-2',
  'complement',
];
let themeIdx = -1;
function theme() {
  themeIdx = (themeIdx + 1) % themes.length;
  return themes[themeIdx];
}
