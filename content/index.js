const { html, unescaped } = require("../lib/html");
const fs = require("fs");

const Header = require("./Header");
const Layout = require("./Layout");

const Avatar = require("../cards/Avatar");
const Bio = require("../cards/Bio");
const YouTube = require("../cards/YouTube");
const Feed = require("../cards/Feed");
const Blog = require("../cards/Blog");
const Project = require("../cards/Project");
const Glitch = require("../cards/Glitch");
const Goodreads = require("../cards/Goodreads");
const Spotify = require("../cards/Spotify");
const Twitter = require("../cards/Twitter");

const themes = [
  "default",
  "primary",
  "secondary-1",
  "secondary-2",
  "complement",
];
let themeIdx = -1;
const theme = () => {
  themeIdx = (themeIdx + 1) % themes.length;
  return themes[themeIdx];
};

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
              title: "Twitch Streaming",
              link: "https://twitch.tv/lmorchard",
              iframe:
                "https://player.twitch.tv/?channel=lmorchard&muted=true&autoplay=true",
              src: fs.readFileSync("./content/twitch.md", "utf-8"),
            })}
            ${Project({
              theme: theme(),
              title: "Firefox Accounts",
              link: "https://accounts.firefox.com/",
              thumbnail:
                "https://accounts-static.cdn.mozilla.net/images/16821f55.firefox-logo.svg",
              src: `I'm a core contributor on Firefox Accounts, working mainly on the subscription services platform.`,
            })}
            ${Blog({ theme: theme(), ...data.Blog })}
            ${Feed({
              theme: theme(),
              link: "https://typing.lmorchard.com",
              maxItems: 12,
              ...data.Typing,
            })}
            ${YouTube({ theme: theme(), maxItems: 12, ...data.YouTube })}
            ${Glitch({ theme: theme(), ...data.Glitch })}
            ${Twitter({ theme: theme(), maxItems: 7, ...data.Twitter})}
            ${Feed({ theme: theme(), maxItems: 12, ...data.Pinboard })}
            ${Spotify({ theme: theme(), maxItems: 7, ...data.Spotify })}
            ${Goodreads({ theme: theme(), ...data.Goodreads })}
          `)}
        </article>
      </div>
    </body>
  </html>
`;
