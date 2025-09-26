const { html, unescaped } = require("../lib/html");
const fs = require("fs");

const Header = require("./Header");
const Layout = require("./Layout");

const Avatar = require("../cards/Avatar");
const Note = require("../cards/Note");
const Bio = require("../cards/Bio");
const YouTube = require("../cards/YouTube");
const Feed = require("../cards/Feed");
const Blog = require("../cards/Blog");
const Project = require("../cards/Project");
const Github = require("../cards/Github");
const Glitch = require("../cards/Glitch");
const Goodreads = require("../cards/Goodreads");
const Spotify = require("../cards/Spotify");
const Twitter = require("../cards/Twitter");
const Twitch = require("../cards/Twitch");
const ActivityPub = require("../cards/ActivityPub");
const Colophon = require("../cards/Colophon");

module.exports = ({ config, data }) => html`
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1" />
      <title>${config.siteTitle}</title>
      <link href="./index.css" rel="stylesheet" />
      <link rel="shortcut icon" href="https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1?s=16" />
    </head>
    <body>
      <div id="root">
        <article>
          ${Header({ title: "Les Orchard <me@lmorchard.com>" })}
          ${Layout(html`
            ${Avatar({ theme: theme(), title: "That's me!" })}
            ${Bio({
              theme: theme(),
              title: "About Me",
              src: fs.readFileSync("./content/bio.md", "utf-8"),
            })}
            ${Blog({ theme: theme(), ...data.Blog })}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Links })}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Fediverse })}
            ${YouTube({ theme: theme(), maxItems: 12, ...data.YouTube })}
            ${Github({ theme: theme(), maxItems: 7, ...data.Github })}
            ${Spotify({ theme: theme(), maxItems: 7, ...data.Spotify })}
            ${Colophon({ theme: theme(), ...data.Colophon })}
          `)}
        </article>
      </div>
    </body>
  </html>
`;

const themes = [
  "default",
  "primary",
  "secondary-1",
  "secondary-2",
  "complement",
];
let themeIdx = -1;
function theme() {
  themeIdx = (themeIdx + 1) % themes.length;
  return themes[themeIdx];
}
