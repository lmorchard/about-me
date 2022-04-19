require('dotenv').config();

const {
  YOUTUBE_USER_ID,
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_KEY,

  TWITTER_USERNAME,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN_KEY,
  TWITTER_ACCESS_TOKEN_SECRET,

  SPOTIFY_USERNAME,
  SPOTIFY_CLIENTID,
  SPOTIFY_CLIENTSECRET,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

module.exports = {
  siteTitle: "lmorchard.com - about me",
  buildPath: "./build",
  fetch: {
    Colophon: {},
    Blog: {
      siteTitle: "blog.lmorchard.com",
      baseURL: "https://blog.lmorchard.com",
      indexURL: "https://blog.lmorchard.com/index.json",
    },
    Github: {
      username: "lmorchard",
      ignoreRepos: [
        "lmorchard/notes",
        "mozilla/FirefoxColor",
      ]
    },
    YouTube: {
      username: YOUTUBE_USER_ID,
      channelId: YOUTUBE_CHANNEL_ID,
      key: YOUTUBE_KEY,
    },
    Twitter: {
      username: TWITTER_USERNAME,
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token_key: TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    },
    Spotify: {
      username: SPOTIFY_USERNAME,
      clientId: SPOTIFY_CLIENTID,
      clientSecret: SPOTIFY_CLIENTSECRET,
      access_token: SPOTIFY_ACCESS_TOKEN,
      refresh_token: SPOTIFY_REFRESH_TOKEN,
      token_type: "Bearer",
      expires_in: 3600,
      scope: "user-read-currently-playing user-read-recently-played",
    },
    Pinboard: {
      component: "Feed",
      title: "Pinboard (u:deusx)",
      link: "https://pinboard.in/u:deusx",
      feedUrls: ["https://feeds.pinboard.in/rss/u:deusx/"],
    },
  },
};
