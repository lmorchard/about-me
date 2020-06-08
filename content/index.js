const { html, unescaped } = require("../lib/html");
const fs = require("fs");

const Header = require("./Header");
const Layout = require("./Layout");
const Avatar = require("../cards/Avatar");
const Bio = require("../cards/Bio");
const YouTube = require("../cards/YouTube");
const Feed = require("../cards/Feed");
const Blog = require("../cards/Blog");

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
            ${YouTube({
              theme: theme(),
              maxItems: 12,
              ...data.YouTube,
            })}
            ${Feed({
              theme: theme(),
              link: "https://typing.lmorchard.com",
              maxItems: 12,
              ...data.Typing,
            })}
            ${Feed({
              theme: theme(),
              maxItems: 12,
              ...data.Pinboard,
            })}
            ${Blog({ theme: theme(), ...data.Blog })}
          `)}
        </article>
      </div>
    </body>
  </html>
`;
