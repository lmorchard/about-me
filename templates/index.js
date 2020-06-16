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
            ${Project({
              theme: theme(),
              title: "Firefox Accounts",
              link: "https://accounts.firefox.com/",
              thumbnail:
                "https://accounts-static.cdn.mozilla.net/images/16821f55.firefox-logo.svg",
              src: fs.readFileSync("./content/fxa.md", "utf-8"),
            })}
            ${Note({
              theme: theme(),
              title: "Notes (notes.lmorchard.com)",
              link: "https://notes.lmorchard.com/",
              ...data.RecentNotes,
            })}
            ${Blog({ theme: theme(), ...data.Blog })}
            ${Twitch({ theme: theme(), maxItems: 12, ...data.Twitch })}
            ${Glitch({ theme: theme(), ...data.Glitch })}
            ${YouTube({ theme: theme(), maxItems: 12, ...data.YouTube })}
            ${Twitter({ theme: theme(), maxItems: 7, ...data.Twitter })}
            ${ActivityPub({
              theme: theme(),
              maxItems: 7,
              name: "Toots",
              ...data.Toots,
            })}
            ${Github({ theme: theme(), maxItems: 7, ...data.Github })}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Pinboard })}
            ${Feed({
              theme: theme(),
              link: "https://typing.lmorchard.com",
              maxItems: 12,
              ...data.Typing,
            })}
            ${Spotify({ theme: theme(), maxItems: 7, ...data.Spotify })}
            ${Goodreads({ theme: theme(), ...data.Goodreads })}
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
